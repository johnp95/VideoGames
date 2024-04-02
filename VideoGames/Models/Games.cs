namespace VideoGames.Models
{
    public class Games
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public string? Developer { get; set; }

        public string? Publisher { get; set; }

        public string? Platform { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}
