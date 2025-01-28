using GameScript.Models;

namespace GameScript.Repositories
{
    public interface IReviewRepository
    {
        Review GetByGameId(int id);
        void Add(Review review);
        void Update(Review review);
    }
}
