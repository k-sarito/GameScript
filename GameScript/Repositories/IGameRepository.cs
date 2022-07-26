using System.Collections.Generic;
using GameScript.Models;

namespace GameScript.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAllByUserId(int userId);
        void Add(Game game);
    }
}
