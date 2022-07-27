using Microsoft.Extensions.Configuration;
using GameScript.Models;
using GameScript.Utils;
using System.Collections.Generic;
using System.Data;

namespace GameScript.Repositories
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(IConfiguration configuration) : base(configuration) { }

        public List<Game> GetAllByUserId(int userId)
        {
            using (var conn= Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, RawgGameId, Name, PercentComplete, Released, Image, Rating, Metacritic, Playtime, Esrb, CurrentThoughts 
                        FROM Game
                        WHERE UserId = @id";
                    DbUtils.AddParameter(cmd, "@id", userId);
                    var reader = cmd.ExecuteReader();
                    var games = new List<Game>();

                    while (reader.Read())
                    {
                        games.Add(new Game()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            RawgGameId = DbUtils.GetInt(reader, "RawgGameId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            PercentComplete = DbUtils.GetInt(reader, "PercentComplete"),
                            Released = DbUtils.GetDateTime(reader, "Released"),
                            Image = DbUtils.GetString(reader, "Image"),
                            Rating = reader.GetDecimal(reader.GetOrdinal("Rating")),
                            Metacritic = DbUtils.GetInt(reader, "Metacritic"),
                            Playtime = DbUtils.GetInt(reader, "Playtime"),
                            Esrb = DbUtils.GetString(reader, "Esrb"),
                            CurrentThoughts = DbUtils.GetString(reader, "CurrentThoughts")
                        });
                    }

                    reader.Close();
                    return games;
                }
            }
        }

        public void Add(Game game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Game (UserId, RawgGameId, Name, PercentComplete, Released, Image, Rating, Metacritic, Playtime, Esrb, CurrentThoughts)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @RawgGameId, @Name, @PercentComplete, @Released, @Image, @Rating, @Metacritic, @Playtime, @Esrb, @CurrentThoughts)";
                    DbUtils.AddParameter(cmd, "@UserId", game.UserId);
                    DbUtils.AddParameter(cmd, "@RawgGameId", game.RawgGameId);
                    DbUtils.AddParameter(cmd, "@Name", game.Name);
                    DbUtils.AddParameter(cmd, "@PercentComplete", game.PercentComplete);
                    DbUtils.AddParameter(cmd, "@Released", game.Released);
                    DbUtils.AddParameter(cmd, "@Image", game.Image);
                    DbUtils.AddParameter(cmd, "@Rating", game.Rating);
                    DbUtils.AddParameter(cmd, "@Metacritic", game.Metacritic);
                    DbUtils.AddParameter(cmd, "@Playtime", game.Playtime);
                    DbUtils.AddParameter(cmd, "@Esrb", game.Esrb);
                    DbUtils.AddParameter(cmd, "@CurrentThoughts", game.CurrentThoughts);

                    game.Id = (int)cmd.ExecuteScalar();
                }

                conn.Close();
            }
        }

        public Game GetById(int id)
        {
            using (var conn= Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, UserId, RawgGameId, Name, PercentComplete, Released, Image, Rating, Metacritic, Playtime, Esrb, CurrentThoughts 
                        FROM Game
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    Game game = null;
                    var reader = cmd.ExecuteReader();

                    if(reader.Read())
                    {
                        game = new Game()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            RawgGameId = DbUtils.GetInt(reader, "RawgGameId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            PercentComplete = DbUtils.GetInt(reader, "PercentComplete"),
                            Released = DbUtils.GetDateTime(reader, "Released"),
                            Image = DbUtils.GetString(reader, "Image"),
                            Rating = reader.GetDecimal(reader.GetOrdinal("Rating")),
                            Metacritic = DbUtils.GetInt(reader, "Metacritic"),
                            Playtime = DbUtils.GetInt(reader, "Playtime"),
                            Esrb = DbUtils.GetString(reader, "Esrb"),
                            CurrentThoughts = DbUtils.GetString(reader, "CurrentThoughts")
                        };
                    }
                    reader.Close();
                    return game;
                }
            }
        }

        public void UpdateProgress(Game game)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Game
                                        SET PercentComplete=@percentComplete, CurrentThoughts=@currentThoughts
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@percentComplete", game.PercentComplete);
                    cmd.Parameters.AddWithValue("@currentThoughts", game.CurrentThoughts);
                    cmd.Parameters.AddWithValue("@id", game.Id);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }
    }
}
