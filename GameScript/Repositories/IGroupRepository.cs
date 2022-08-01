using GameScript.Models;
using System.Collections.Generic;

namespace GameScript.Repositories
{
    public interface IGroupRepository
    {
        List<Group> GetAllByUserId(int userId);
        void Add(Group group);
        void AddUser(int userId, int groupId);
        List<Group> GetAllUnjoined(int userId);
    }
}
