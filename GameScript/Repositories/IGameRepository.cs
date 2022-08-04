using System.Collections.Generic;
using GameScript.Models;

namespace GameScript.Repositories
{
    public interface IGameRepository
    {
        List<Game> GetAllByUserId(int userId);
        void Add(Game game);
        void UpdateProgress(Game game);
        Game GetById(int id);
        Game GetByRawgId(int id, int userId);
    }
}
