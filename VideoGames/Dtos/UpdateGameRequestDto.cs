using System.ComponentModel.DataAnnotations;

namespace VideoGames.Dtos
{
    public class UpdateGameRequestDto
    {
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Developer { get; set; } = string.Empty;

        [Required]
        public string Publisher { get; set; } = string.Empty;

        [Required]
        public string Platform { get; set; } = string.Empty;

        [Required]
        public DateTime ReleaseDate { get; set; }
    }
}
