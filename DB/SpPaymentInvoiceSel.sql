Use Jagadish_LibraryMS;


CREATE OR ALTER PROCEDURE dbo.SpPaymentInvoiceSel
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
    ('paymentId'),
    ('userName'),
    ('email'),
    ('paymentType'),
	('totalAmount');

    DECLARE @Col VARCHAR(MAX);

    SELECT @Col = STRING_AGG('"' + c.[Name] + '"', ',')
    FROM #Col AS c;

    SET @Col = '[' + @Col + ']';
	
	SELECT @Json = (
		SELECT
			(
				SELECT DISTINCT 
					PaymentId AS paymentId,
					UserName AS userName,
					EmailAddress AS email,
					ListItem AS paymentType,
					Amount AS totalAmount
				FROM (
					SELECT 
						p1.PaymentId,
						p1.Amount,
						u1.UserName,
						u1.EmailAddress,
						li1.ListItem
					FROM dbo.Payment p1
					INNER JOIN dbo.Borrow b ON b.PaymentId = p1.PaymentId
					INNER JOIN dbo.[User] u1 ON u1.UserId = b.UserId
					INNER JOIN dbo.[ListItem] li1 ON p1.PaymentType = li1.ListId
					UNION ALL
					SELECT 
						p2.PaymentId,
						p2.Amount,
						u2. UserName,
						u2.EmailAddress,
						li2.ListItem
					FROM dbo.Payment p2
					INNER JOIN dbo.CustomerMembership cm ON cm.PaymentId = p2.PaymentId
					INNER JOIn dbo.[User] u2 ON u2.UserId = cm.UserId
					INNER JOIN dbo.[ListItem] li2 ON p2.PaymentType = li2.ListId
				) AS UniquePaymentIds
				FOR JSON PATH
			) AS paymentDetails,
			(
				JSON_QUERY(@Col)
			) AS [column]
		FOR JSON PATH
	);

	SELECT @Json as Json;

END;





EXEC dbo.SpPaymentInvoiceSel @Json = null;

SELECT * FROM dbo.Borrow;
SELECT * FROM dbo.Payment;

SELECT * FROM dbo.ListItem;

INSERT INTO dbo.Payment(PaymentType, Amount, PaymentDate, UserPersonId)
VALUES(6, 3023, GETDATE(), 1);

UPDATE dbo.Borrow
SET PaymentId = 9
WHERE BorrowId = 22;

SELECT * FROM dbo.ListItem;