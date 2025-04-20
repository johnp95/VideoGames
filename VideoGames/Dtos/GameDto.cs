namespace VideoGames.Dtos
{
    public class GameDto
    {
        public string Title { get; set; } = string.Empty;

        public string ImgUrl { get; set; } = string.Empty;
        public string Developer { get; set; } = string.Empty;

        public string Publisher { get; set; } = string.Empty;

        public string Platform { get; set; } = string.Empty;

        public DateTime ReleaseDate { get; set; }
    }
}
