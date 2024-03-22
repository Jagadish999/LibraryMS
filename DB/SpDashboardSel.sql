Use Jagadish_LibraryMS;

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/20/2024
-- Description: Procedure to get Required data for admin dashboard
-- =========================================================================================================
CREATE OR ALTER PROCEDURE dbo.SpDashboardSel
(
	@Json NVARCHAR(MAX)
)
AS
BEGIN

	DECLARE @StartDate SMALLDATETIME;
	DECLARE @EndDate SMALLDATETIME;

	SELECT
		@StartDate = dj.[startDate],
		@EndDate = dj.[endDate]
	FROM OPENJSON(@Json)
	WITH(
		[startDate] SMALLDATETIME,
		[endDate] SMALLDATETIME)
	AS dj

	-- total user, total book issued, total payment, available book,
	DECLARE @TotalRevenue MONEY;
	DECLARE @TotalUser INT;
	DECLARE @TotalBooks INT;
	DECLARE @TotalAvailableBooks INT;
	DECLARE @TotalIssuedBooks INT;

	SELECT
		@TotalIssuedBooks = COUNT(1)
	FROM dbo.Borrow bo
	WHERE bo.InsertDate
	BETWEEN ISNULL(@StartDate, bo.InsertDate) AND ISNULL(@EndDate, bo.InsertDate)
	AND bo.ReturnedDate IS NULL;

	PRINT @TotalIssuedBooks;

	SELECT
		@TotalBooks = SUM(b.Quantity)
	FROM dbo.Book b
	WHERE b.InsertDate
	BETWEEN ISNULL(@StartDate, b.InsertDate) AND ISNULL(@EndDate, b.InsertDate)

	SELECT
		@TotalUser = COUNT(1)
	FROM dbo.[User] u
	INNER JOIN dbo.ListItem li
	ON li.ListId = u.UserType
	WHERE li.ListItem = 'REGULAR'
	AND u.InsertDate BETWEEN ISNULL(@StartDate, u.InsertDate) AND ISNULL(@EndDate, u.InsertDate);

	SELECT 
		 @TotalRevenue = ISNULL(SUM(p.Amount), 0)
	FROM dbo.Payment p
	WHERE p.InsertDate 
	BETWEEN ISNULL(@StartDate, p.InsertDate) 
	AND ISNULL(@EndDate, p.InsertDate)

	SELECT
		(SELECT
			@TotalRevenue AS totalRevenue,
			@TotalUser AS totalUser,
			@TotalBooks AS totalBooks,
			@TotalAvailableBooks AS totalAvailableBooks,
			@TotalIssuedBooks AS totalIssuedBooks
			FOR JSON PATH
		) AS Json;
END;

DECLARE @StartDate SMALLDATETIME = DATEADD(DAY, -10, GETDATE());
DECLARE @EndDate SMALLDATETIME = DATEADD(DAY, 0, GETDATE());

DECLARE @JsonData NVARCHAR(MAX)= '{"startDate":"'+ CAST( @StartDate AS NVARCHAR) +'", "endDate":"'+CAST( @EndDate AS NVARCHAR)+'"}';

EXEC dbo.SpDashboardSel
	@Json = @JsonData


SELECT * FROM dbo.Borrow;