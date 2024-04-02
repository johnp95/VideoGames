using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VideoGames.Dtos;
using VideoGames.Helpers;
using VideoGames.Interfaces;
using VideoGames.Mappers;

namespace VideoGames.Controllers
{
    [Route("api/Games")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepo;

        public GameController(IGameRepository gameRepo)
        {
            _gameRepo = gameRepo;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] QueryObject query)
        {
            var games = await _gameRepo.GetAllAsync(query);
            var gameDto = games.Select(g => g.ToGameDto());


            return Ok(gameDto);

        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var game = await _gameRepo.GetByIdAsync(id);

            if (game == null)
            {
                return NotFound();
            }
            return Ok(game.ToGameDto());
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var game = await _gameRepo.DeleteAsync(id);

            if ( game == null)
            {
                return NotFound();    
            }
            return NoContent();
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateGameDto gameDto)
        {
            var gameModel = gameDto.ToGameFromCreate();

            await _gameRepo.CreateAsync(gameModel);

            return CreatedAtAction(nameof(GetById), new {id = gameModel.Id}, gameModel.ToGameDto());
        }
    }
}
