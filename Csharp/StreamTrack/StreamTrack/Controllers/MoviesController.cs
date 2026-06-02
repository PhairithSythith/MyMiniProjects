using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamTrack.Models;

namespace StreamTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly StreamTrackContext _context;

        public MoviesController(StreamTrackContext context)
        {
            _context = context;
        }

        // GET: api/movies
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            try
            {
                var movies = await _context.Films.ToListAsync();
                return Ok(movies);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Hiba történt az adatbázis elérésekor!", error = ex.Message });
            }
        }

        // POST: api/movies (Ezzel tudsz majd új filmet beküldeni a teszteléshez!)
        [HttpPost]
        public async Task<ActionResult<Film>> PostMovie(Film ujFilm)
        {
            _context.Films.Add(ujFilm);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovies), new { id = ujFilm.Id }, ujFilm);
        }
    }
}