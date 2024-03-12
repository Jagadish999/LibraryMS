USE [Jagadish_LibraryMS];

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/8/2024
-- Description: Stored Procedure to receive user details with specific email and password or all users
-- ======================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpUserSel
(
	@JsonParams NVARCHAR(max)
)
AS
BEGIN
	SET NOCOUNT ON;

	-- Variable for storing Email & Password
	DECLARE @UserEmail NVARCHAR(50);
	DECLARE @UserPassword NVARCHAR(50);

	-- Store passed email & password
	SELECT 
		@UserEmail = uj.[emailAddress],
		@UserPassword = uj.[password]
	FROM OPENJSON(@JsonParams)
	WITH(
		emailAddress NVARCHAR(50),
		password NVARCHAR(50)
	) AS uj;

	-- Variable for Json returned by Dynamic Query
	DECLARE @JsonData NVARCHAR(max);

	SET @JsonData = (
					SELECT 
						u.[UserId] AS userId,
						u.[Name] AS fullName,
						u.[EmailAddress] AS email,
						u.[Phone] AS phone,
						li.[ListItem] AS userType
					FROM dbo.[User] u
					INNER JOIN dbo.ListItem li
					ON li.ListId = u.UserType
					WHERE u.[EmailAddress] = ISNULL(@UserEmail, u.[EmailAddress])
					AND u.[Password] = ISNULL(@UserPassword, u.[Password])

					FOR JSON PATH); 

	SELECT @JsonData AS Json;
END;

DECLARE @JsonInfo NVARCHAR(max);
SET @JsonInfo = '{"emailAddress": "parajulijagadish9@gmail.com", "password": "password123"}'; 

EXEC dbo.SpUsersel @JsonParams = @JsonInfo;


SELECT * FROM dbo.[User];
SELECT * FROM dbo.[ListItem];
