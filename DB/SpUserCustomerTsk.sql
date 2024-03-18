USE [Jagadish_LibraryMS];

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/12/2024
-- Description: Procedure to insert customer detail and return newly inserted customer details.
-- =========================================================================================================

CREATE OR ALTER PROCEDURE dbo.SpUserCustomerTsk
(
	@Json NVARCHAR(MAX) OUTPUT
)
AS
BEGIN

	SET NOCOUNT ON;

	-- temp table to record userId
	CREATE TABLE #OutUser(
		UserId INT
	);

	-- temp table to record paymentId
	CREATE TABLE #OutPayment(
		PaymentId INT
	);

	-- Insert new user as customer
	BEGIN TRY
		BEGIN TRANSACTION;

			DECLARE @SpecificUserId INT;

			-- Check for update or insert
			SELECT @SpecificUserId = uj.[userId] FROM OPENJSON(@Json) WITH([userId] INT) AS uj;

			IF @SpecificUserId IS NULL
			BEGIN
				
				-- Insert details in user table as regular type
				INSERT INTO dbo.[User] ([Name], [EmailAddress], [Phone], [UserType], [UserPersonId], [UserName], [Password])
				OUTPUT Inserted.UserId
				INTO #OutUser(UserId)
				SELECT
					uj.[fullName],
					uj.[email],
					uj.[phone],
					uj.[userType] ,
					uj.[userPersonId],
					uj.[userName],
					uj.[password]
				FROM OPENJSON(@Json)
				WITH(
					[fullName] NVARCHAR(50),
					[email] NVARCHAR(50),
					[phone] NVARCHAR(25),
					[userType] INT,
					[userPersonId] INT,
					[userName] NVARCHAR(50),
					[password] NVARCHAR(50)
				) AS uj;

				-- Insert into payment table for membership Charge
				INSERT INTO dbo.[Payment] (PaymentType, Amount, PaymentDate, UserPersonId)
				OUTPUT Inserted.PaymentId
				INTO #OutPayment(PaymentId)
				SELECT
					uj.[paymentType],
					m.MembershipFee,
					GETDATE(),
					uj.[userPersonId]
				FROM OPENJSON(@Json)
				WITH(
					[paymentType] INT,
					[membershipId] INT,
					[userPersonId] INT
				) AS uj
				INNER JOIN dbo.Membership m
				ON uj.[membershipId] = m.MembershipId;

			
				-- Insert into CustomerMembership
				INSERT INTO dbo.[CustomerMembership] (UserId, MembershipId, StartDate, EndDate, PaymentId, UserPersonId)
				SELECT
					(SELECT ou.UserId FROM #OutUser ou),
					m.MembershipId,
					GETDATE(),
					DATEADD(DAY, m.MembershipDuration, GETDATE()),
					(SELECT op.PaymentId FROM #OutPayment op),
					uj.[userPersonId]
				FROM OPENJSON(@Json)
				WITH(
					[membershipId] INT,
					[userPersonId] INT
				) AS uj
				INNER JOIN dbo.Membership AS m
				ON m.MembershipId = uj.[membershipId];

			END
			ELSE
			BEGIN
				
				-- update the given details
				INSERT INTO #OutUser(UserId)
				VALUES(@SpecificUserId);
				PRINT 'Updating';

				SELECT * FROM dbo.[User] u WHERE u.UserId = @SpecificUserId;
				-- Update user details
				UPDATE dbo.[User]
				SET [Name] = uj.[fullName],
					[EmailAddress] = uj.[email],
					[Phone] = uj.[phone],
					[UserPersonId] = uj.[userPersonId],
					[UserName] = uj.[userName]
				FROM OPENJSON(@Json)
				WITH (
					[fullName] NVARCHAR(50),
					[email] NVARCHAR(50),
					[phone] NVARCHAR(25),
					[userType] INT,
					[userPersonId] INT,
					[userName] NVARCHAR(50),
					[password] NVARCHAR(50)
				) AS uj
				WHERE dbo.[User].[UserId] = @SpecificUserId;

				SELECT 'adasd';

				SELECT * FROM dbo.[User] u WHERE u.UserId = @SpecificUserId;

				SELECT 1/0;
			END;

		COMMIT TRANSACTION;
	END TRY

	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;
	END CATCH;


	-- Store new data in json params
	SELECT @Json = (
		SELECT
			u.[UserId] AS [userId],
			u.[Name] AS [fullName],
			u.[EmailAddress] as [email],
			u.[Phone] AS [phone],
			li.[ListItem] AS [userType]
		FROM dbo.[User] u
		INNER JOIN #OutUser ou
		ON ou.UserId = u.UserId
		INNER JOIN dbo.[ListItem] AS li
		ON li.ListId = u.UserType FOR JSON PATH, INCLUDE_NULL_VALUES
	);

	DROP TABLE #OutUser;
	DROP TABLE #OutPayment;
END;

DECLARE @Data NVARCHAR(max);
SET @Data = '{"fullName":"Temp221Updated",
"email":"temp999@gamil.com",
"phone": "12999",
"userName": "temp999",
"userPersonId": 1,
"userId": 22}';
EXEC dbo.SpUserCustomerTsk @Json = @Data
SELECT * FROM dbo.[User];

SELECT @Data AS NewData;

SELECT * FROM dbo.[Borrow];


