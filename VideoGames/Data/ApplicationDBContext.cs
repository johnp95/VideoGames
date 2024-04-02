using Microsoft.EntityFrameworkCore;
using VideoGames.Models;

namespace VideoGames.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {

        }
            public DbSet<Game> Games { get; set; }
    }
}
