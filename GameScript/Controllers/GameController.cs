using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using GameScript.Models;
using GameScript.Repositories;

namespace GameScript.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        public GameController(IGameRepository gameRepository)
        {
            _gameRepository = gameRepository;
        }

        [HttpGet("{userId}")]
        public IActionResult GetGamesByUserId(int userId)
        {
            return Ok(_gameRepository.GetAllByUserId(userId));
        }

        [HttpGet("Details/{id}")]
        public IActionResult GetGameById(int id)
        {
            var game = _gameRepository.GetById(id);
            return Ok(game);
        }

        [HttpPost]
        public IActionResult Add(Game game)
        {
            _gameRepository.Add(game);
            return Ok(game);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }
            _gameRepository.UpdateProgress(game);
            return NoContent();
        }
    }
}
