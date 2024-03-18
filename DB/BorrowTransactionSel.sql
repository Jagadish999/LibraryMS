
USE [Jagadish_LibraryMS];


GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/14/2024
-- Description: Procedure to return complete data set of pending borrows
-- =========================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpBorrowTransactionSel
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
    ('borrowId'),
    ('bookId'),
    ('bookTitle'),
    ('userId'),
	('userName'),
	('charge'),
	('action');

    DECLARE @Col VARCHAR(MAX);

    SELECT @Col = STRING_AGG('"' + c.[Name] + '"', ',')
    FROM #Col AS c;

    SET @Col = '[' + @Col + ']';

    SELECT @Json = (
        SELECT (SELECT
            b.BorrowId AS borrowId,
            b.BookId AS bookId,
            bo.Title AS bookTitle,
            b.UserId AS userId,
            u.UserName AS userName,
            b.Charge AS charge,
            (DATEDIFF(day, b.BorrowedDate, GETDATE())) AS holdingDays,
            (DATEDIFF(day, b.BorrowedDate, b.ReturnDueDate)) AS allowedHolding
        FROM dbo.Borrow b
        INNER JOIN dbo.[User] u ON u.UserId = b.UserId
        INNER JOIN dbo.[Book] bo ON b.BookId = bo.BookId
        WHERE b.ReturnedDate IS NULL AND b.PaymentId IS NULL
        FOR JSON PATH) AS [data],
		JSON_QUERY(@Col) AS [column]
		FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    );

	SELECT @Json As Json;

END;



EXEC dbo.SpBorrowTransactionSel @Json = null;


	SELECT * FROM dbo.Membership;

	SELECT * FROM dbo.Borrow;
	SELECT * FROM dbo.Payment;


