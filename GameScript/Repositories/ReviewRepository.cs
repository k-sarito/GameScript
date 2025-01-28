using Microsoft.Extensions.Configuration;
using GameScript.Models;
using GameScript.Utils;
using System.Collections.Generic;
using System.Data;

namespace GameScript.Repositories
{
    public class ReviewRepository: BaseRepository, IReviewRepository
    {
        public ReviewRepository(IConfiguration configuration) : base(configuration) { }

        public Review GetByGameId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                   SELECT Id, GameId, UserPurchasePrice, UserPlatform, UserPlaytime, Completed, Graphics, Story, Content
                                    FROM Review
                                    WHERE GameId = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Review review = null;

                    if(reader.Read())
                    {
                        review = new Review()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            GameId = DbUtils.GetInt(reader, "GameId"),
                            UserPurchasePrice = reader.GetDecimal(reader.GetOrdinal("UserPurchasePrice")),
                            UserPlatform = DbUtils.GetString(reader, "UserPlatform"),
                            UserPlaytime = DbUtils.GetInt(reader, "UserPlaytime"),
                            Completed = reader.GetBoolean(reader.GetOrdinal("Completed")),
                            Graphics = DbUtils.GetInt(reader, "Graphics"),
                            Story = DbUtils.GetInt(reader, "Story"),
                            Content = DbUtils.GetString(reader, "Content")
                        };
                    }
                    reader.Close();
                    return review;
                }
            }
        }

        public void Add(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO Review (GameId, UserPurchasePrice, UserPlatform, UserPlaytime, Completed, Graphics, Story, Content)
                                OUTPUT INSERTED.ID
                                VALUES (@gameId, @userPurchasePrice, @userPlatform, @userPlaytime, @completed, @graphics, @story, @content)";
                    DbUtils.AddParameter(cmd, "@gameId", review.GameId);
                    DbUtils.AddParameter(cmd, "@userPurchasePrice", review.UserPurchasePrice);
                    DbUtils.AddParameter(cmd, "@userPlatform", review.UserPlatform);
                    DbUtils.AddParameter(cmd, "@userPlaytime", review.UserPlaytime);
                    DbUtils.AddParameter(cmd, "@completed", review.Completed);
                    DbUtils.AddParameter(cmd, "@graphics", review.Graphics);
                    DbUtils.AddParameter(cmd, "@story", review.Story);
                    DbUtils.AddParameter(cmd, "@content", review.Content);

                    review.Id = (int)cmd.ExecuteScalar();
                }

                conn.Close();
            }
        }

        public void Update(Review review)
        {
            using (var conn= Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Review
                                        SET UserPurchasePrice=@userPurchasePrice, UserPlatform=@userPlatform, UserPlaytime=@userPlaytime, Completed=@completed, Graphics=@graphics, Story=@story, Content=@content
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", review.Id);
                    DbUtils.AddParameter(cmd, "@userPurchasePrice", review.UserPurchasePrice);
                    DbUtils.AddParameter(cmd, "@userPlatform", review.UserPlatform);
                    DbUtils.AddParameter(cmd, "@userPlaytime", review.UserPlaytime);
                    DbUtils.AddParameter(cmd, "@completed", review.Completed);
                    DbUtils.AddParameter(cmd, "@graphics", review.Graphics);
                    DbUtils.AddParameter(cmd, "@story", review.Story);
                    DbUtils.AddParameter(cmd, "@content", review.Content);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }
    }
}
