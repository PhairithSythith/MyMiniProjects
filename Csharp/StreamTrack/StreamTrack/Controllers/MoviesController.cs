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
        // PUT: api/movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(int id, [FromBody] Movie modositottFilm)
        {
            if (id != modositottFilm.Id)
            {
                return BadRequest("A megadott ID nem egyezik a film azonosítójával.");
            }

            // Értesítjük az Entity Frameworköt, hogy ez az objektum módosult
            _context.Entry(modositottFilm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ha a mentés során kiderül, hogy a film már nem létezik az adatbázisban
                if (!_context.Film.Any(e => e.Id == id))
                {
                    return NotFound($"A(z) {id} azonosítójú film nem található.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Sikeres módosítás után 204 No Content-et szokás küldeni
        }

        // DELETE: api/movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var film = await _context.Film.FindAsync(id);
            if (film == null)
            {
                return NotFound($"A(z) {id} azonosítójú film nem található.");
            }

            // Töröljük a filmet a kontextusból és mentjük a változást
            _context.Film.Remove(film);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"A(z) {id} azonosítójú film sikeresen törölve." });
        }
    }
}