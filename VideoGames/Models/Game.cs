namespace VideoGames.Models
{
    public class Game
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Developer { get; set; } = string.Empty;

        public string Publisher { get; set; } = string.Empty;

        public string Platform { get; set; } = string.Empty;

        public DateTime ReleaseDate { get; set; }
    }
}
