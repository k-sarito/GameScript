using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using GameScript.Models;
using GameScript.Repositories;

namespace GameScript.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        public ReviewController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }
        [HttpGet("{gameId}")]
        public IActionResult GetReviewByGame(int gameId)
        {
            return Ok(_reviewRepository.GetByGameId(gameId));
        }

        [HttpPost]
        public IActionResult Add(Review review)
        {
            _reviewRepository.Add(review);
            return Ok(review);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Review review)
        {
            if(id != review.Id)
            {
                return BadRequest();
            }
            _reviewRepository.Update(review);
            return NoContent();
        }
    }
}
