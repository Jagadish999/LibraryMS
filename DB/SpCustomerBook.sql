USE [Jagadish_LibraryMS]


GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/17/2024
-- Description: Procedure to receive data of all books borrowred by a customer
-- =========================================================================================================

CREATE OR ALTER PROCEDURE dbo.SpCustomerBorrowedBooksSel
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
	('availableQuantity');

    DECLARE @Col VARCHAR(MAX);

    SELECT @Col = STRING_AGG('"' + c.[Name] + '"', ',')
    FROM #Col AS c;

	SET @Col = '[' + @Col + ']';

	-- take userId
	DECLARE @UserId INT;
	SELECT @UserId = uj.[userId]
	FROM OPENJSON(@Json)
	WITH(
		[userId] INT
	) uj;

	IF @UserId IS NOT NULL
	BEGIN
	
		SELECT (
			SELECT (
				SELECT
					b.[BookId] AS bookId,
					b.[Title] AS title,
					b.[Author] AS author,
					b.[Genre] AS genre,
					b.[Quantity] AS quantity,
					b.[AvailableQuantity] AS availableQuantity
				FROM dbo.[Book] b
				INNER JOIN dbo.Borrow bo
				ON bo.BookId =  b.BookId
				WHERE bo.ReturnedDate IS NULL
				AND bo.UserId = @UserId
				FOR JSON PATH, INCLUDE_NULL_VALUES
			) AS [data],
			JSON_QUERY(@Col) AS [column]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
		) AS [Json];
	END;

END;



DECLARE @JsonData NVARCHAR(MAX);
SET @JsonData = N'{"userId":"11"}';

EXEC dbo.SpCustomerBorrowedBooksSel
    @Json = @JsonData;


	SELECT * FROM dbo.Borrow;
