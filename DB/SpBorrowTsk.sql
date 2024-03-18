Use Jagadish_LibraryMS

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/14/2024
-- Description: Procedure to insert inside borrow table
-- =========================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpBorrowTsk
(
	@Json NVARCHAR(MAX) OUTPUT
)
AS
BEGIN
	
	SET NOCOUNT ON;

	DECLARE @borrowId INT;
	DECLARE @fee MONEY;
	DECLARE @bookId INT;

	CREATE TABLE #Out(BorrowId INT);
	SELECT 
		@borrowId = bj.[borrowId],
		@fee = bj.[Fee],
		@bookId = bj.[bookId]
	FROM OPENJSON(@Json)
	WITH(
		[fee] MONEY,
		[borrowId] INT,
		[bookId] INT
	) AS bj;

	BEGIN TRY
	BEGIN TRANSACTION;

		-- When Borrow is setteled
		IF @borrowId IS NOT NULL
		BEGIN
			
			CREATE TABLE #InsOut(PaymentId INT);

			-- insert payment
			IF @fee > 0
			BEGIN

				INSERT INTO dbo.Payment(PaymentType, Amount, PaymentDate, UserPersonId)
				OUTPUT Inserted.PaymentId
				INTO #InsOut(PaymentId)
				SELECT
					6,
					@fee,
					GETDATE(),
					bj.[userPersonId]
				FROM OPENJSON(@Json)
				WITH(
					[userPersonId] INT
				) AS bj;
			END;

			-- update return date  and payment id
			UPDATE dbo.Borrow
			SET 
				ReturnedDate = GETDATE(),
				PaymentId = (SELECT PaymentId FROM #InsOut)
			WHERE BorrowId = @borrowId;

			-- update book details
			UPDATE dbo.Book
			SET
				AvailableQuantity = [AvailableQuantity] + 1
			WHERE BookId = @bookId;

		END

		-- When Borrow is issued
		ELSE
		BEGIN
			
			INSERT INTO dbo.Borrow (UserId, BookId, BorrowedDate, ReturnDueDate, ReturnedDate, Charge, PaymentId, UserPersonId)
			OUTPUT Inserted.BorrowId
			INTO #Out(BorrowId)
			SELECT
				bj.[userId],
				bj.[bookId],
				GETDATE(),
				DATEADD(DAY, m.BorrowDuration, GETDATE()),
				null,
				m.LateReturnCharge,
				null,
				bj.[userPersonId]
			FROM OPENJSON(@Json)
			WITH(
				[userId] INT,
				[bookId] INT,
				[userPersonId] INT
			)
			AS bj
			INNER JOIN dbo.[CustomerMembership] cm
			ON cm.UserId = bj.[userId]
			INNER JOIN dbo.[Membership] m
			ON m.MembershipId = cm.MembershipId;

			UPDATE dbo.[Book]
			SET [AvailableQuantity] = [AvailableQuantity] - 1
			WHERE BookId = @bookId;

			SELECT @Json = (
				SELECT
					b.[BorrowId] AS borrowId,
					b.[UserId] AS userId,
					b.[BookId] AS bookId,
					b.[BorrowedDate] AS borrowedDate,
					b.[ReturnDueDate] AS returnDueDate,
					b.[Charge] AS charge
				FROM dbo.[Borrow] b
				INNER JOIN #Out ob
				ON b.BorrowId = ob.BorrowId
			FOR JSON PATH, INCLUDE_NULL_VALUES);

		END

	COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH;

	DROP TABLE #Out;

END;

/*
*/
DECLARE @JsonData NVARCHAR(max) = '{
    "userId": 2,
    "bookId": 1,
    "userPersonId": 1
}';
EXEC dbo.SpBorrowTsk @Json = @JsonData;


SELECT * FROM dbo.Book;

SELECT * FROM dbo.Borrow;









SELECT @JsonData AS INFOSSSSSS;

SELECT * FROM dbo.Borrow;

DECLARE @JsonData NVARCHAR(max) = '{
    "borrowId": 6,
    "bookId": 1,
    "userId": 22,
	"fee": 0,
	"userPersonId": 1
}';


SELECT * FROM dbo.Payment;

SELECT * FROM dbo.Borrow;


SELECT * FROM dbo.[User];

SELECT * FROM dbo.[Membership];