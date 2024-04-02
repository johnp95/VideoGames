namespace VideoGames.Helpers
{
    public class QueryObject
    {
        public string? Title { get; set; } = string.Empty;
        public string? Developer { get; set; }

        public string? Publisher { get; set; }

        public string? Platform { get; set; }

        public DateTime ReleaseDate { get; set; }
    }
}
