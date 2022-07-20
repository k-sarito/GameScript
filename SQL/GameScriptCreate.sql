USE [master]

IF db_id('GameScript') IS NULl
  CREATE DATABASE [GameScript]
GO

USE [GameScript]
GO


DROP TABLE IF EXISTS [UserGroup];
DROP TABLE IF EXISTS [Review];
DROP TABLE IF EXISTS [Group];
DROP TABLE IF EXISTS [Game];
DROP TABLE IF EXISTS [UserProfile];
GO



CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [UserName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserGroup] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GroupId] int NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Group] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [AdminId] int NOT NULL
)
GO

CREATE TABLE [Game] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int,
  [RawgGameId] int,
  [Name] nvarchar(255),
  [PercentComplete] int,
  [Released] datetime,
  [Image] nvarchar(255),
  [Rating] decimal,
  [Metacritic] int,
  [Playtime] int,
  [Esrb] nvarchar(255),
  [CurrentThoughts] nvarchar(255)
)
GO

CREATE TABLE [Review] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [GameId] int NOT NULL,
  [UserPurchasePrice] decimal NOT NULL,
  [UserPlatform] nvarchar(255) NOT NULL,
  [UserPlaytime] int NOT NULL,
  [Completed] bit NOT NULL DEFAULT (0),
  [Graphics] int NOT NULL,
  [Story] int NOT NULL,
  [Content] nvarchar(255)
)
GO

ALTER TABLE [UserGroup] ADD FOREIGN KEY ([GroupId]) REFERENCES [Group] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserGroup] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Group] ADD FOREIGN KEY ([AdminId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([GameId]) REFERENCES [Game] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Game] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO
