IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='EM_EventTable' AND xtype='U')
BEGIN
    CREATE TABLE [dbo].[EM_EventTable]
    (     
        [EventId] NVARCHAR(50) PRIMARY KEY, -- Make EventId as the primary key
        [EventName] NVARCHAR(50) NOT NULL,
        [EventDesc] NVARCHAR(MAX) NULL,
        [StartDate] DateTime NOT NULL,
        [EndDate] DateTime NOT NULL,
        [TimeZone] NVARCHAR(50) NULL
    )
END
GO
IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'EventId') BEGIN
ALTER TABLE EM_EventTable ADD [EventId] nvarchar(50)
END
GO 

IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'EventName') BEGIN
ALTER TABLE EM_EventTable ADD [EventName] nvarchar(50)
END
GO 

IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'EventDesc') BEGIN
ALTER TABLE EM_EventTable ADD [EventDesc] nvarchar(max)
END
GO 

IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'StartDate') BEGIN
ALTER TABLE EM_EventTable ADD [StartDate] DateTime
END
GO 

IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'EndDate') BEGIN
ALTER TABLE EM_EventTable ADD [EndDate] DateTime
END
GO 

IF NOT EXISTS(SELECT * FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'EM_EventTable' AND COLUMN_NAME = 'TimeZone') BEGIN
ALTER TABLE EM_EventTable ADD [TimeZone] nvarchar(50)
END
GO 



