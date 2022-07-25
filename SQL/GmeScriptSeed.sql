USE [GameScript];
GO 

set identity_insert [UserProfile] on
insert into UserProfile (Id, UserName, FirstName, LastName, Email, FirebaseUserId) values (1, 'Ksarito', 'Cory', 'Clark', 'cory@test.com', 'upiX9I9HRkR0ca4bWZRU8dgjNhf2');
insert into UserProfile (Id, UserName, FirstName, LastName, Email, FirebaseUserId) values (2, 'wish4joe', 'Luke', 'Slater', 'luke@test.com', 'fx265rYc1wYEI91N8oUf9b8WUw23');
insert into UserProfile (Id, UserName, FirstName, LastName, Email, FirebaseUserId) values (3, 'prickly', 'Kendrick', 'Wallace', 'kendrick@snails.com', '03k6xTWybrZpVfuxuND7ypL7ERG3');
insert into UserProfile (Id, UserName, FirstName, LastName, Email, FirebaseUserId) values (4, 'liesure', 'Alex', 'Levy', 'alex@levy.com', '8UgPQJJJKHN9I3M0vwVvCtGI1d43');
insert into UserProfile (Id, UserName, FirstName, LastName, Email, FirebaseUserId) values (5, 'marlboro', 'Derick', 'Cravens', 'derick@cravens.com', 'IkvdmOUrJXQgoaruMmrrEalnTVy2');
set identity_insert [UserProfile] off

set identity_insert [Group] on
insert into [Group] ([Id], [Name], AdminId) VALUES (1, 'OldFolks', 1)
set identity_insert [Group] off

set identity_insert [UserGroup] on
insert into [UserGroup] ([Id], UserId, GroupId) VALUES (1, 1, 1), (2, 2, 1), (3, 3, 1);
set identity_insert [UserGroup] off

set identity_insert [Game] on 
insert into Game (Id, UserId, RawgGameId, [Name], PercentComplete, Released, Image, Rating, Metacritic, Playtime, Esrb, CurrentThoughts) VALUES (1, 1, 3498, 'Grand Theft Auto V', 60, '2013-09-17', 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg', 4.48, 91, 72, 'Mature', 'Loving it!');
set identity_insert [Game] off

set identity_insert [Review] on
insert into Review (Id, GameId, UserPurchasePrice, UserPlatform, UserPlaytime, Completed, Graphics, Story, Content) VALUES (1, 1, 40.00, 'PS4', 40, 0, 8, 7, 'The world of GTA is expansive and fun to explore, however the story can get a bit bogged down with follow and fetch quests. The protagonists are occasionally hard to root for on account of them not being very relatable. To contrast this game with something like RDR2, for instance, you instantly feel a connection with the protagonist yet still can mold him to be whatever character fits with your narrative. While GTA falls short of this, it is certainly worth exploring.')
set identity_insert [Review] off

