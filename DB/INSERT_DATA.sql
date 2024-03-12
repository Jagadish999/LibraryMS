USE [Jagadish_LibraryMS];

SELECT * FROM dbo.[ListItem];

SELECT * FROM dbo.[Membership];

SELECT * FROM dbo.[User];

INSERT INTO dbo.[ListItem] (ListItem, ListItemCategory)
VALUES
	('ADMIN', 'USER_TYPE'),
	('REGULAR', 'USER_TYPE'),
	('NORMAL', 'MEMBERSHIP_TYPE'),
	('VIP', 'MEMBERSHIP_TYPE'),
	('ADMISSION', 'PAYMENT_TYPE'),
	('LATEFEE', 'PAYMENT_TYPE');

INSERT INTO dbo.[User] ([Name], [EmailAddress], [Phone], [UserName], [Password], [UserType], [UserPersonId])
VALUES
	('Jagadish Parajuli', 'parajulijagadish9@gmail.com', '+977 1111111111', 'Jagadish', 'password123', 1, NULL);

INSERT INTO dbo.[Membership](MembershipType, MembershipFee, MembershipDuration, LateReturnCharge, BorrowDuration, MaxBorrow, [Description], UserPersonId)
VALUES
	(1, 1000, 365, 50, 10, 20, 'Best Value Membership', 1),
	(2, 600, 180, 100, 6, 10, 'Average Value Membership', 1);

INSERT INTO dbo.[Book] ([Title], [Author], [Genre], [Quantity], [AvailableQuantity], [UserPersonId])
VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 10, 10, 1),
    ('To Kill a Mockingbird', 'Harper Lee', 'Drama', 15, 15, 1),
    ('1984', 'George Orwell', 'Dystopian', 20, 20, 1),
    ('Pride and Prejudice', 'Jane Austen', 'Romance', 12, 12, 1),
    ('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 18, 18, 1);
