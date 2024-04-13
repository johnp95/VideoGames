using VideoGames.Dtos;
using VideoGames.Models;

namespace VideoGames.Mappers
{
    public static class GameMappers
    {
        public static GameDto ToGameDto(this Game gameModel)
        {
            return new GameDto
            {
                Title = gameModel.Title,
                Developer = gameModel.Developer,
                Publisher = gameModel.Publisher,
                Platform = gameModel.Platform,
                ReleaseDate = gameModel.ReleaseDate
            };

        }
        public static Game ToGameFromCreate(this CreateGameDto gameDto)
        {
            return new Game
            {
                Title = gameDto.Title,
                ImgUrl = gameDto.ImgUrl,
                Developer = gameDto.Developer,
                Publisher = gameDto.Publisher,
                Platform = gameDto.Platform,
                ReleaseDate = gameDto.ReleaseDate
            };

        }
    }
}
