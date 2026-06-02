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
            var users = await _context.Felhasznalos.ToListAsync();
            return Ok(users);
        }

        // POST: api/users (Most már jó helyen, az osztályon belül!)
        [HttpPost]
        public async Task<ActionResult<Felhasznalo>> PostUser(Felhasznalo ujFelhasznalo)
        {
            _context.Felhasznalos.Add(ujFelhasznalo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = ujFelhasznalo.Id }, ujFelhasznalo);
        }
    }
}