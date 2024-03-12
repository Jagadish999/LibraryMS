Use [Jagadish_LibraryMS];

GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================
-- Author: Jagadish Parajuli
-- Create Date: 03/11/2024
-- Description: Stored Procedure to receive common details like: add Customer requirements ().
-- ======================================================================================================

DROP PROCEDURE dbo.SpFormDataSel;

CREATE OR ALTER PROCEDURE dbo.SpFormDataSel
(
	@JsonParams NVARCHAR(max)
)
AS
BEGIN
	SET NOCOUNT ON;

	-- Create a temp table for all required columns
	CREATE TABLE #TempColumnField(
		[Name] NVARCHAR(50),
		[DataType] NVARCHAR(50),
		[Type] NVARCHAR(50),
		[Display] NVARCHAR(50),
		[Order] INT
	);

	-- Variable for storing data returned by Dynamic Query
	DECLARE @JsonData NVARCHAR(max);

	INSERT INTO #TempColumnField([Name], [DataType], [Type], [Display], [Order])
	VALUES
		('Name', 'NVARCAHR(50)', 'text', 'Full Name', 1),
		('EmailAddress', 'NVARCAHR(50)', 'email', 'Email Address', 2),
		('Phone', 'NVARCAHR(15)', 'string', 'Phone Number', 3),
		('UserName', 'NVARCAHR(50)', 'text', 'User Name', 4),
		('Password', 'NVARCHAR(50)', 'password', 'Password', 5),
		('UserType', 'NVARCHAR(50)', 'string', 'User Type', 6),
		('MembershipType', 'NVARCHAR(50)', 'string', 'Membership Type', 7);


	/*
	DECLARE @ReqDataFor NVARCHAR(50);
	SELECT 
		@ReqDataFor = cj.required
	FROM OPENJSON(@JsonParams) 
	WITH(
		[required] NVARCHAR(50)
	) AS cj;
	*/

	SELECT * FROM #TempColumnField FOR JSON PATH;


	-- Data Received from Json
	DECLARE @ReqDataFor NVARCHAR(50);

	SELECT 
		@ReqDataFor = QUOTENAME(cj.required)
	FROM OPENJSON(@JsonParams)
	WITH(
		required NVARCHAR(50)
	) AS cj;

	/*

	IF @ReqDataFor = 'customerEntry'
	BEGIN

		
		SELECT * FROM #TempColumnField FOR Json Path;

		-- Dynamic Query for receiving column details and data required
		DECLARE @DynColumnNames NVARCHAR(max);
		
		SET @DynColumnNames = 'SELECT '+ CHAR(10) +
									'(SELECT' + CHAR(10) +
										'tc.[Name] AS name, ' + CHAR(10) +
										'tc.[Display] AS display, ' + CHAR(10) +
										'tc.[Type] AS type ' + CHAR(10) +
									'FROM #TempColumnField tc FOR JSON PATH) AS [formFields], ' + CHAR(10) +
									'(SELECT '+ CHAR(10) +
										'(SELECT * FROM dbo.[ListItem] li WHERE li.ListItemCategory = ''USER_TYPE'' FOR JSON PATH) AS userType,' + CHAR(10) +
										'(SELECT * FROM dbo.[ListItem] li WHERE li.ListItemCategory = ''MEMBERSHIP_TYPE'' FOR JSON PATH) AS membershipType' + CHAR(10) +
									' FOR JSON PATH) AS data' + CHAR(10)+
							  ' FOR JSON PATH';

		-- Dynamic Query for variable to store returned data
		DECLARE @FormDetailJson NVARCHAR(1000);

		SET @FormDetailJson ='SET @JsonData = (' + CHAR(10) +
								   @DynColumnNames + ');';

		-- EXEC sp_executesql @FormDetailJson, N'@JsonData NVARCHAR(max) OUTPUT', @JsonData OUTPUT;
		-- SELECT ISNULL(@JsonData, (SELECT '{}' AS nullData FOR JSON PATH)) AS Json;

		SELECT * FROM dbo.[User] FOR JSON Path;
	END;
	
	DROP TABLE #TempColumnField;

	-- Show Data as final output
	-- SELECT ISNULL(@JsonData, (SELECT '{}' AS nullData FOR JSON PATH)) AS Json;
	*/
END;


-- Execute the stored procedure with sample JSON parameters
EXEC dbo.SpFormDataSel @JsonParams = '{"required": "customerEntry"}';
