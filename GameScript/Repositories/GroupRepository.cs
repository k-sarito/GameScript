using Microsoft.Extensions.Configuration;
using GameScript.Models;
using GameScript.Utils;
using System.Collections.Generic;


namespace GameScript.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
    {
        public GroupRepository(IConfiguration configuration) : base(configuration) { }

        public List<Group> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT g.Id, g.Name, g.AdminId
                         FROM [Group] as g
                         LEFT JOIN UserGroup as ug ON ug.GroupId = g.Id
                         LEFT JOIN UserProfile as up ON up.Id = ug.UserId
                         WHERE up.Id = @id";
                    DbUtils.AddParameter(cmd, "@id", userId);
                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();

                    while (reader.Read())
                    {
                        groups.Add(new Group()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            AdminId = DbUtils.GetInt(reader, "AdminId")
                        });
                    }

                    reader.Close();
                    return groups;
                }
            }
        }

        public List<Group> GetAllUnjoined(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.Name, g.AdminId, up.Id as UserId
                        FROM [Group] as g
                        LEFT JOIN UserGroup as ug ON ug.GroupId = g.Id
                        LEFT JOIN UserProfile as up ON up.Id = ug.UserId
                        WHERE up.Id != @id AND g.AdminId != @id";
                    DbUtils.AddParameter(cmd, "@id", userId);
                    var reader = cmd.ExecuteReader();
                    var groups = new List<Group>();

                    while (reader.Read())
                    {
                        groups.Add(new Group()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            AdminId = DbUtils.GetInt(reader, "AdminId")
                        });
                    }

                    reader.Close();
                    return groups;
                }
            }
        }

        public void Add(Group group)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Group] (Name, AdminId)
                        OUTPUT INSERTED.ID
                        VALUES (@name, @adminId)";
                    DbUtils.AddParameter(cmd, "@name", group.Name);
                    DbUtils.AddParameter(cmd, "@adminId", group.AdminId);
                    group.Id = (int)cmd.ExecuteScalar();
                }
                conn.Close();
            }
        }

        public void AddUser(int userId, int groupId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO UserGroup (GroupId, UserId)
                            OUTPUT INSERTED.ID
                            VALUES (@groupId, @userId)";
                    DbUtils.AddParameter(cmd, "@groupId", groupId);
                    DbUtils.AddParameter(cmd, "@userId", userId);
                    cmd.ExecuteNonQuery();
                }
                conn.Close();
            }
        }
    }
}
