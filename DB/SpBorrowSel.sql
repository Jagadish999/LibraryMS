Use Jagadish_LibraryMS

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/14/2024
-- Description: Procedure to return complete data set of customer and books for borrow.
-- =========================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpBorrowSel
(
	@Json NVARCHAR(MAX)
)
AS
BEGIN

	SET NOCOUNT ON;

	CREATE TABLE #Col
    (
        ColID INT IDENTITY(1,1),
        [Name] VARCHAR(100)
    );

    INSERT INTO #Col([Name])
    VALUES
    ('bookId'),
    ('title'),
    ('author'),
    ('genre'),
	('quantity'),
	('availableQuantity'),
	('action');

    DECLARE @Col VARCHAR(MAX);

    SELECT @Col = STRING_AGG('"' + c.[Name] + '"', ',')
    FROM #Col AS c;

    SET @Col = '[' + @Col + ']';
	
	-- User Details with number of books specific user can borrow
	
	SELECT @Json = (
		SELECT (
			SELECT
				u.[UserId] AS userId,
				u.[Name] AS fullName,
				u.[EmailAddress] AS email,
				u.[Phone] AS phone,
				u.[UserName] AS userName,
				cm.CustomerMembershipId AS customerMembershipId,
				m.MaxBorrow AS userMaxBorrowLimit,
				(
					SELECT COUNT(1)
					FROM dbo.[Borrow] b
					WHERE b.UserId = u.UserId
					AND b.ReturnedDate IS NULL
				) AS totalBooksBorrowed,
				(m.MaxBorrow - (SELECT COUNT(1) FROM dbo.[Borrow] b WHERE b.UserId = u.UserId)) AS availableBorrows
			FROM dbo.[User] u
			INNER JOIN dbo.[CustomerMembership] cm ON cm.UserId = u.UserId
			INNER JOIN dbo.[Membership] m ON m.MembershipId = cm.MembershipId
			FOR JSON PATH
		) AS userDetails, 
		(
			SELECT
				b.[BookId] as bookId,
				b.[Title] as title,
				b.[Author] as author,
				b.[Genre] as genre,
				b.[Quantity] as quantity,
				b.[AvailableQuantity] as availableQuantity
			FROM dbo.[Book] AS b
			WHERE b.AvailableQuantity > 0
			FOR JSON PATH
		) AS bookDetails,
		JSON_QUERY(@Col) AS [column]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
	);

	SELECT @Json AS Json
END;

DECLARE @JsonData NVARCHAR(max) = null;

EXEC dbo.SpBorrowSel
	@Json = null;

SELECT * FROM dbo.CustomerMembership

SELECT * FROM dbo.Membership;

SELECT * FROM dbo.Borrow;

SELECT * FROM dbo.Book;