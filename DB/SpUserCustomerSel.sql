USE [Jagadish_LibraryMS];

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 02/29/2024
-- Description: Procedure to return complete data set of customer details.
-- =========================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpCustomerSel
(
	@Json NVARCHAR(MAX)
)
AS
BEGIN

        CREATE TABLE #Col
        (
            ColID INT IDENTITY(1,1),
            [Name] VARCHAR(100)
        );

        INSERT INTO #Col([Name])
        VALUES
        ('fullName'),
        ('email'),
        ('phone'),
        ('userType'),
		('membershipType'),
		('userName'),
		('action');

        DECLARE @Col VARCHAR(MAX);

        SELECT @Col = STRING_AGG('"' + c.[Name] + '"', ',')
        FROM #Col AS c;

        SET @Col = '[' + @Col + ']';

        SELECT (
            SELECT (
                SELECT
                    u.[UserId] AS [userId],
                    u.[Name] AS [fullName],
					u.[EmailAddress] as [email],
                    u.[Phone] AS [phone],
					li1.[ListItem] AS [userType],
					u.[UserName] AS userName,
					li2.[ListItem] AS [membershipType]
                FROM dbo.[User] u

				INNER JOIN dbo.[ListItem] AS li1
				ON li1.ListId = u.UserType

				-- Inner join user and customermembership and membership and listItem
				INNER JOIN dbo.[CustomerMembership] AS cm
				ON cm.UserId = u.UserId

				INNER JOIN dbo.[Membership] AS m
				ON m.MembershipId = cm.MembershipId

				INNER JOIN dbo.[ListItem] AS li2
				ON li2.ListId = m.MembershipType

				WHERE li1.ListItem = 'REGULAR'

                FOR JSON PATH, INCLUDE_NULL_VALUES
            ) AS [data],
            JSON_QUERY(@Col) AS [column],
			(
				SELECT
					m.MembershipId AS membershipTypeId,
					m.MembershipFee AS membershipFee,
					li.ListItem AS membershipTypeName
				FROM dbo.Membership m
				INNER JOIN dbo.ListItem li
				ON li.ListId = m.MembershipType
				FOR JSON PATH
			) AS membershipTypeDetails,
			(
				SELECT
					li.ListId AS userTypeId,
					li.ListItem AS userTypeName
				FROM dbo.ListItem li
				WHERE li.ListItem = 'REGULAR' AND li.ListItemCategory = 'USER_TYPE'
				FOR JSON PATH
			) AS userTypes,
			(
				SELECT
					li.ListId AS paymentTypeId,
					li.ListItem As paymentTypeName
				FROM dbo.ListItem li
				WHERE li.ListItem = 'ADMISSION' AND li.ListItemCategory = 'PAYMENT_TYPE'
				FOR JSON PATH
			) AS paymentTypes
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS [Json];
END;

SELECT * FROM dbo.[User];

SELECT * FROM dbo.[CustomerMembership];

SELECT * FROM dbo.[Membership];

SELECT * FROm dbo.[ListItem];

EXEC dbo.SpCustomerSel
	@Json = null
