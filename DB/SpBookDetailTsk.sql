--USE [Jagadish_LibraryMS]

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/13/2024
-- Description: Procedure to insert book details.
-- =========================================================================================================

CREATE OR ALTER PROCEDURE dbo.SpBookDetailTsk
(
	@Json NVARCHAR(MAX) OUTPUT
)
AS
BEGIN

	SET NOCOUNT ON;

	-- temp table to record userId
	CREATE TABLE #Out(
		BookId INT
	);

	-- INSERT Customer details
	BEGIN TRY
	BEGIN

		INSERT INTO dbo.[Book](Title, Author, Genre, Quantity, AvailableQuantity, UserPersonId)
		OUTPUT Inserted.BookId
		INTO #Out(BookId)
		SELECT
			bj.title,
			bj.author,
			bj.genre,
			bj.totalQuantity,
			bj.availableQuantity,
			bj.userPersonId
		FROM OPENJSON(@Json)
		WITH(
			[title] NVARCHAR(200),
			[author] NVARCHAR(500),
			[genre] NVARCHAR(50),
			[totalQuantity] INT,
			[availableQuantity] INT,
			[userPersonId] INT
		) AS bj;


		SELECT @Json = (
			SELECT 
                    b.BookId AS bookId,
					b.Title AS title,
					b.Author AS author,
					b.Genre AS genre,
					b.Quantity AS totalQuantity,
					b.AvailableQuantity AS availableQuantity
			FROM dbo.Book b
			INNER JOIN #Out o
			ON b.BookId = o.BookId
			 FOR JSON PATH, INCLUDE_NULL_VALUES);



	END;
	END TRY

	BEGIN CATCH

		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW;

	END CATCH;
END;


DECLARE @Data NVARCHAR(max);

SET @Data = '{"title": "title 1","author": "Author 1","genre": 12,"totalQuantity": 12,"availableQuantity": 12,"userPersonId": 1}';

EXEC dbo.SpBookDetailTsk @Json = @Data;

SELECT @Data AS bla;


SELECT * FROM dbo.[Book];