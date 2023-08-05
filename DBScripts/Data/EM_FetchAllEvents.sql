IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('EM_FetchAllEvents')) exec('CREATE  PROCEDURE [dbo].[EM_FetchAllEvents] AS BEGIN SET NOCOUNT ON; END ') 
GO

ALTER PROCEDURE [dbo].[EM_FetchAllEvents]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM EM_EventTable;
END
