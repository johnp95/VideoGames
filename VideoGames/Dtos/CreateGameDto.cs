using System.ComponentModel.DataAnnotations;

namespace VideoGames.Dtos
{
    public class CreateGameDto
    {
        [Required]
        public string? Title { get; set; }
        public string? ImgUrl { get; set; }
        [Required]
        public string? Developer { get; set; }
        [Required]
        public string? Publisher { get; set; }
        [Required]
        public string? Platform { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
    }
}
