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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var gameModel = gameDto.ToGameFromCreate();

            await _gameRepo.CreateAsync(gameModel);

            return CreatedAtAction(nameof(Get), new {id = gameModel.Id}, gameModel.ToGameDto());
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateGameRequestDto gameDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var gameModel = await _gameRepo.UpdateAsync(id, gameDto);

            if (gameModel == null)
                return NotFound();
            
            return Ok(gameModel.ToGameDto());
        }
    }
}
