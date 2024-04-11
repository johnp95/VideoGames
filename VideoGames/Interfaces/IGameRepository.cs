using VideoGames.Dtos;
using VideoGames.Helpers;
using VideoGames.Models;

namespace VideoGames.Interfaces
{
    public interface IGameRepository
    {
        Task<List<Game>> GetAllAsync(QueryObject query);

        Task<Game?> GetByIdAsync(int id);

        Task<Game?> DeleteAsync(int id);

        Task<Game> CreateAsync(Game gameModel);

        Task<Game?> UpdateAsync(int id, UpdateGameRequestDto gameDto);
    }

}
