using Microsoft.EntityFrameworkCore;
using VideoGames.Data;
using VideoGames.Helpers;
using VideoGames.Interfaces;
using VideoGames.Models;

namespace VideoGames.Repository
{
    public class GameRepository : IGameRepository
    {
        private readonly ApplicationDBContext _context;

        public GameRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Game> CreateAsync(Game gameModel)
        {
            await _context.Games.AddAsync(gameModel);
            await _context.SaveChangesAsync();

            return gameModel;

        }

        public async Task<Game?> DeleteAsync(int id)
        {
            var gameModel = await _context.Games.FirstOrDefaultAsync(x => x.Id == id);

            if (gameModel == null)
            {
                return null;
            }
            _context.Games.Remove(gameModel);
            await _context.SaveChangesAsync();

            return gameModel;
        }

        public async Task<List<Game>> GetAllAsync(QueryObject query)
        {
            var games = _context.Games.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Title))
            {
                games = games.Where(x => x.Title.Contains(query.Title));
            } 
            if (!string.IsNullOrWhiteSpace(query.Developer))
            {
                games = games.Where(x => x.Developer.Contains(query.Developer));
            }
            if (!string.IsNullOrWhiteSpace(query.Publisher))
            {
                games = games.Where(x => x.Publisher.Contains(query.Publisher));
            }
            if (!string.IsNullOrWhiteSpace(query.Platform))
            {
                games = games.Where(x => x.Platform.Contains(query.Platform));
            }
            return await games.ToListAsync();
        }

        public async Task<Game?> GetByIdAsync(int id)
        {
            return await _context.Games.FirstOrDefaultAsync(x => x.Id == id);

        }
    }


}
