IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('EM_DeleteEvent')) exec('CREATE  PROCEDURE [dbo].[EM_DeleteEvent] AS BEGIN SET NOCOUNT ON; END ') 
GO

ALTER Procedure [dbo].[EM_DeleteEvent](
    @EventId NVARCHAR(50)
)
AS
BEGIN

    DELETE FROM EM_EventTable WHERE EventId = @EventId;
    SELECT * FROM EM_EventTable;
END;

