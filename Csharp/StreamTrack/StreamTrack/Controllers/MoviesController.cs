using Microsoft.AspNetCore.Authorization;
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

        // POST: api/movies
        [HttpPost]
        [Authorize] // 🔐 Csak bejelentkezett felhasználóknak!
        public async Task<ActionResult<Film>> PostMovie(Film ujFilm)
        {
            _context.Films.Add(ujFilm);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovies), new { id = ujFilm.Id }, ujFilm);
        }

        // 🟢 JAVÍTOTT PUT: api/movies/5
        [HttpPut("{id}")]
        [Authorize] // 🔐 Csak bejelentkezett felhasználóknak!
        public async Task<IActionResult> PutMovie(int id, [FromBody] Film modositottFilm)
        {
            if (id != modositottFilm.Id)
            {
                return BadRequest("A megadott ID nem egyezik a film azonosítójával.");
            }

            _context.Entry(modositottFilm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Átírva Films-re
                if (!_context.Films.Any(e => e.Id == id))
                {
                    return NotFound($"A(z) {id} azonosítójú film nem található.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // 🟢 JAVÍTOTT DELETE: api/movies/5
        [HttpDelete("{id}")]
        [Authorize] // 🔐 Csak bejelentkezett felhasználóknak!
        public async Task<IActionResult> DeleteMovie(int id)
        {
            // Átírva Films-re
            var film = await _context.Films.FindAsync(id);
            if (film == null)
            {
                return NotFound($"A(z) {id} azonosítójú film nem található.");
            }

            _context.Films.Remove(film);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"A(z) {id} azonosítójú film sikeresen törölve." });
        }
    }
}