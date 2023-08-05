IF NOT EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND OBJECT_ID = OBJECT_ID('EM_CreateUpdateEvent')) exec('CREATE  PROCEDURE [dbo].[EM_CreateUpdateEvent] AS BEGIN SET NOCOUNT ON; END ') 
GO

ALTER PROCEDURE [dbo].[EM_CreateUpdateEvent](
    @EventId NVarChar(50),
    @EventName NVarChar(50),
    @EventDesc NVarChar(max), 
    @StartDate Date, 
    @EndDate Date,  
    @TimeZone NVarChar(50)
)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT * FROM EM_EventTable WHERE EventId = @EventId)
    BEGIN
        INSERT INTO EM_EventTable (EventId, EventName, EventDesc, StartDate, EndDate, TimeZone)
        VALUES (NEWID(), @EventName, @EventDesc, @StartDate, @EndDate, @TimeZone)
    END
    ELSE
    BEGIN
        UPDATE EM_EventTable
        SET
            EventName = @EventName,
            EventDesc = @EventDesc,
            StartDate = @StartDate,
            EndDate = @EndDate,
            TimeZone = @TimeZone
        WHERE EventId = @EventId
    END
        SELECT * FROM EM_EventTable;
END

