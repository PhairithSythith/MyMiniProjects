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
            // Lekérjük az összes értékelést az adatbázisból
            var ratings = await _context.Ertekeles.ToListAsync();
            return Ok(ratings);
        }
    }
}