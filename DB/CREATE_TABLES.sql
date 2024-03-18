USE [Jagadish_LibraryMS];

-- All List category data
CREATE TABLE dbo.[ListItem](
	[ListId] INT IDENTITY(1, 1) PRIMARY KEY,
	[ListItem] NVARCHAR(50),
	[ListItemCategory] NVARCHAR(50)
);

-- All spuer user and remaining users information
CREATE TABLE dbo.[User](
	[UserId] INT IDENTITY(1, 1) PRIMARY KEY,
	[Name] NVARCHAR(50) NOT NULL,
	[EmailAddress] NVARCHAR(50) UNIQUE NOT NULL,
	[Phone] NVARCHAR(15) UNIQUE NOT NULL,
	[UserName] NVARCHAR(25) UNIQUE NOT NULL,
	[Password] NVARCHAR(25) NOT NULL,
	[UserType] INT NOT NULL,
	[UserPersonId] INT,
	[InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
	FOREIGN KEY (UserType) REFERENCES dbo.ListItem(ListId),
	FOREIGN KEY (UserPersonId) REFERENCES dbo.[User](UserId)
);

-- Membership details
CREATE TABLE dbo.Membership (
    [MembershipId] INT IDENTITY(1, 1) PRIMARY KEY,
    [MembershipType] INT NOT NULL,
    [MembershipFee] MONEY NOT NULL,
    [MembershipDuration] INT NOT NULL,
    [LateReturnCharge] MONEY NOT NULL,
    [BorrowDuration] INT NOT NULL,
    [MaxBorrow] INT NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [UserPersonId] INT NOT NULL,
    [InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY (UserPersonId) REFERENCES dbo.[User](UserId),
	FOREIGN KEY (MembershipType) REFERENCES dbo.[ListItem](ListId)
);

-- Create table for payment table
CREATE TABLE dbo.[Payment] (
    [PaymentId] INT IDENTITY(1, 1) PRIMARY KEY,
    [PaymentType] INT NOT NULL, -- FK fine, charge, 
    [Amount] MONEY NOT NULL,
    [PaymentDate] SMALLDATETIME NOT NULL,
    [UserPersonId] INT NOT NULL, --FK User Person
    [InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY ([UserPersonId]) REFERENCES dbo.[User](UserId),
	FOREIGN KEY ([PaymentType]) REFERENCES dbo.[ListItem](ListId)
);

-- Customer Membership Details
CREATE TABLE dbo.CustomerMembership (
    [CustomerMembershipId] INT IDENTITY(1, 1) PRIMARY KEY,
    [UserId] INT NOT NULL, --FK
    [MembershipId] INT NOT NULL, --FK
    [StartDate] SMALLDATETIME NOT NULL,
    [EndDate] SMALLDATETIME NOT NULL ,
    [PaymentId] INT NOT NULL, --FK 
    [UserPersonId] INT NOT NULL, --FK
    [InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY (UserId) REFERENCES dbo.[User](UserId),
    FOREIGN KEY (MembershipId) REFERENCES dbo.[Membership](MembershipId),
    FOREIGN KEY (PaymentId) REFERENCES dbo.Payment(PaymentId),
    FOREIGN KEY (UserPersonId) REFERENCES dbo.[User](UserId)
);


-- Table to record details for books
CREATE TABLE dbo.[Book] (
    [BookId] INT IDENTITY(1, 1) PRIMARY KEY,
    [Title] NVARCHAR(100) NOT NULL,
    [Author] NVARCHAR(50) NOT NULL,
    [Genre] NVARCHAR(50) NOT NULL,
    [Quantity] INT NOT NULL,
    [AvailableQuantity] INT NOT NULL,
    [UserPersonId] INT NOT NULL, --FK
    [InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY ([UserPersonId]) REFERENCES dbo.[User]([UserId])
);

-- Table to record customer book borrowed details
CREATE TABLE dbo.[Borrow] (
    [BorrowId] INT IDENTITY(1, 1) PRIMARY KEY,
    [UserId] INT NOT NULL, -- FK
    [BookId] INT NOT NULL, --FK 
    [BorrowedDate] SMALLDATETIME NOT NULL,
    [ReturnDueDate] SMALLDATETIME NOT NULL,
    [ReturnedDate] SMALLDATETIME,
    [Charge] MONEY,
    [PaymentId] INT, -- FK
    [UserPersonId] INT NOT NULL, -- FK
    [InsertDate] SMALLDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY ([UserId]) REFERENCES dbo.[User]([UserId]),
    FOREIGN KEY ([BookId]) REFERENCES dbo.[Book]([BookId]), 
    FOREIGN KEY ([PaymentId]) REFERENCES dbo.[Payment]([PaymentId]),
    FOREIGN KEY ([UserPersonId]) REFERENCES dbo.[User]([UserId])
);




DROP TABLE dbo.Borrow;
DROP TABLE dbo.Book;
DROP TABLE dbo.CustomerMembership;
DROP TABLE dbo.Payment;
DROP TABLE dbo.Membership;
DROP TABLE dbo.[User];
DROP TABLE dbo.[ListItem];






SELECT * FROM dbo.[ListItem];

SELECT * FROM dbo.[Membership];

SELECT * FROM dbo.[CustomerMembership];

SELECT * FROM dbo.[Payment];

SELECT * FROM dbo.[Borrow];

SELECT * FROM dbo.[Book];