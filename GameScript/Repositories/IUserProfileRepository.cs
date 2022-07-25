using GameScript.Models;
using System.Collections.Generic;


namespace GameScript.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAllUsers();

        UserProfile GetByUserId(int userId);
    }
}
