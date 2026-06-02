using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamTrack.Models;

namespace StreamTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StreamTrackContext _context;

        public UsersController(StreamTrackContext context)
        {
            _context = context;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetUsers()
        {
            // Lekérjük a felhasználókat az adatbázisból
            var users = await _context.Felhasznalos.ToListAsync();
            return Ok(users);
        }
    }
}