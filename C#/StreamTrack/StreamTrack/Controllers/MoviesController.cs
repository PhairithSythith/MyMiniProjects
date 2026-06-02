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
        // 1. Behozzuk a legenerált adatbázis kontextust
        private readonly StreamTrackContext _context;

        // 2. A konstruktorban elkérjük a .NET-től a futó adatbázis kapcsolatot (Dependency Injection)
        public MoviesController(StreamTrackContext context)
        {
            _context = context;
        }

        // 3. Az igazi Végpont: Kilistázza az összes filmet a MariaDB-ből
        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            try
            {
                // Lekérjük a 'film' tábla összes sorát aszinkron módon
                var movies = await _context.Films.ToListAsync();

                // Visszaküldjük a filmek listáját a böngészőnek (200 OK)
                return Ok(movies);
            }
            catch (Exception ex)
            {
                // Ha valami hiba történne (pl. leállt a MariaDB), hibát küldünk vissza
                return StatusCode(500, new { message = "Hiba történt az adatbázis elérésekor!", error = ex.Message });
            }
        }
    }
}