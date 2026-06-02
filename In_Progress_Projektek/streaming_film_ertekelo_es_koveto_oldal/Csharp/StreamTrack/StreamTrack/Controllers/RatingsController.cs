using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamTrack.Models;

namespace StreamTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly StreamTrackContext _context;

        public RatingsController(StreamTrackContext context)
        {
            _context = context;
        }

        // GET: api/ratings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetRatings()
        {
            var ratings = await _context.Ertekeles
                .Include(e => e.Film)
                .ToListAsync();

            return Ok(ratings);
        }

        // 🟢 EZT A RÉSZT ADTUK HOZZÁ A MENTÉSHEZ:
        // POST: api/ratings
        [HttpPost]
        public async Task<ActionResult<Ertekele>> PostRating([FromBody] Ertekele ujErtekeles)
        {
            if (ujErtekeles == null)
            {
                return BadRequest("Az értékelés adatai hiányoznak.");
            }

            // Hozzáadjuk a kontextushoz és elmentjük az adatbázisba
            _context.Ertekeles.Add(ujErtekeles);
            await _context.SaveChangesAsync();

            // Visszaküldjük a 201 Created státuszt és az elmentett objektumot
            return CreatedAtAction(nameof(GetRatings), new { id = ujErtekeles.Id }, ujErtekeles);
        }
    }
}