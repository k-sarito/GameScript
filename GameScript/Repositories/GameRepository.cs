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
    }
}
