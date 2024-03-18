USE Jagadish_LibraryMS;

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/12/2024
-- Description: Stored Procedure to receive book details
-- ======================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpBookSel
(
	@JsonParams NVARCHAR(max)
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
                FOR JSON PATH, INCLUDE_NULL_VALUES
            ) AS [data],
            JSON_QUERY(@Col) AS [column]
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
        ) AS [Json];
END;


SELECT * FROM dbo.Book;

EXEC dbo.SpBookSel @JsonParams = null;