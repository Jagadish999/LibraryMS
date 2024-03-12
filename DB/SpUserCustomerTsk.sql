USE [Jagadish_LibraryMS]

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

	-- INSERT Customer details
	BEGIN TRY
	BEGIN
		
		DECLARE @FullName NVARCHAR(50);
		DECLARE @Email NVARCHAR(50);
		DECLARE @Password NVARCHAR(25);
		DECLARE @Phone NVARCHAR(25);
		DECLARE @UserType INT;
		DECLARE @MembershipType INT;
		DECLARE @PaymentType INT;
		DECLARE @UserPersonId INT;
		DECLARE @UserName NVARCHAR(50);

		-- Extract values from the JSON using OPENJSON
		SELECT 
			@FullName = uj.[fullName],
			@Email = uj.[email],
			@Password = uj.[password],
			@Phone = uj.[phone],
			@UserType = uj.[userType],
			@MembershipType = uj.[membershipType],
			@PaymentType =	uj.[paymentType],
			@UserPersonId = uj.[userPersonId],
			@UserName = uj.[userName]
		FROM OPENJSON(@Json) 
		WITH (
			[fullName] NVARCHAR(50),
			[email] NVARCHAR(50),
			[password] NVARCHAR(50),
			[phone] NVARCHAR(25),
			[userType] INT,
			[membershipType] INT,
			[paymentType] INT,
			[userPersonId] INT,
			[userName] NVARCHAR(50)
		) AS uj;

		-- Insert details in user table
		INSERT INTO dbo.[User] ([Name], [EmailAddress], [Phone], [UserType], [UserPersonId], [UserName], [Password])
		OUTPUT Inserted.UserId
		INTO #OutUser(UserId)
		VALUES(@FullName, @Email, @Phone, @UserType, @UserPersonId, @UserName, @Password);

		DECLARE @MembershipFee MONEY;
		SELECT @MembershipFee =  m.MembershipFee FROM dbo.Membership m WHERE m.MembershipType = @MembershipType;


		-- Insert into payment
		INSERT INTO dbo.[Payment] (PaymentType, Amount, PaymentDate, UserPersonId)
		OUTPUT Inserted.PaymentId INTO #OutPayment(PaymentId)
		VALUES (@PaymentType, @MembershipFee, GETDATE(), @UserPersonId);

		-- SELECT * FROM dbo.[Membership]
		INSERT INTO dbo.[CustomerMembership] (UserId, MembershipId, StartDate, EndDate, PaymentId, UserPersonId)
		SELECT
			(SELECT ou.UserId from #OutUser ou),
			(SELECT TOP 1 m.MembershipId FROM dbo.[Membership] m WHERE m.MembershipType = @MembershipType),
			GETDATE(),
			(SELECT TOP 1 DATEADD(DAY, m.MembershipDuration, GETDATE()) FROM dbo.[Membership] m WHERE m.MembershipType = @MembershipType),
			(SELECT op.PaymentId FROM #OutPayment op),
			@UserPersonId;

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
	END;
	END TRY

	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;

	END CATCH;
END;

DECLARE @Data NVARCHAR(max);
SET @Data = '{"fullName":"Temp2", "email":"temp2@gamil.com", "password": "temp1223", "phone": "19sdasd", "userType": 2, "membershipType": 1, "paymentType": 15, "userPersonId": 1, "userName": "temp22"}';
EXEC dbo.SpUserCustomerTsk @Json = @Data

SELECT @Data AS NewData;

-- p 11
SELECT * FROM dbo.Membership;

SELECT * FROM dbo.[User];
SELECT * FROM dbo.Payment;

SELECT * FROM dbo.CustomerMembership;


SELECT * FROM dbo.ListItem;
