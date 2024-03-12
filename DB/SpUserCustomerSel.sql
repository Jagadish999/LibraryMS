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
					li.[ListItem] AS [userType]
                FROM dbo.[User] u
				INNER JOIN dbo.[ListItem] AS li
				ON li.ListId = u.UserType
				WHERE li.[ListItem] = 'REGULAR'
                FOR JSON PATH, INCLUDE_NULL_VALUES
            ) AS [data],
            JSON_QUERY(@Col) AS [column]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS [Json];
END;

SELECT * FROM dbo.[User];
SELECT * FROm dbo.[ListItem];

EXEC dbo.SpCustomerSel
	@Json = null