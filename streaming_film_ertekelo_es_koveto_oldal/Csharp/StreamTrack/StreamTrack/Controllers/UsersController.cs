using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamTrack.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<Felhasznalo>> PostUser(Felhasznalo ujFelhasznalo)
        {
            // 🔐 Megsózzuk és lehasheljük a nyers jelszót a BCrypt segítségével
            ujFelhasznalo.Jelszo = BCrypt.Net.BCrypt.HashPassword(ujFelhasznalo.Jelszo);

            _context.Felhasznalos.Add(ujFelhasznalo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = ujFelhasznalo.Id }, ujFelhasznalo);
        }

        // POST: api/users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginAdatok)
        {
            // 1. Kikeressük a felhasználót név alapján
            var felhasznalo = await _context.Felhasznalos
                .FirstOrDefaultAsync(u => u.FelhNev == loginAdatok.FelhNev);

            // 2. Ha nem létezik, VAGY a BCrypt szerint a nyers jelszó nem egyezik a titkosított hash-el
            if (felhasznalo == null || !BCrypt.Net.BCrypt.Verify(loginAdatok.Jelszo, felhasznalo.Jelszo))
            {
                return Unauthorized(new { uzenet = "Hibás felhasználónév vagy jelszó!" });
            }

            // 3. Ha minden jó, összeállítjuk a JWT Tokent
            var tokenHandler = new JwtSecurityTokenHandler();
            var kulcsSzoveg = "EzEgySzuperTitkosEsNagyonHosszuKulcsAmiLegalabb32KarakterbolAll123!";
            var key = Encoding.UTF8.GetBytes(kulcsSzoveg);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, felhasznalo.FelhNev),
                    new Claim(ClaimTypes.NameIdentifier, felhasznalo.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = "StreamTrackServer",
                Audience = "StreamTrackUsers",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenSzoveg = tokenHandler.WriteToken(token);

            // 4. Visszaküldjük a generált tokent
            return Ok(new
            {
                uzenet = "Sikeres bejelentkezés!",
                token = tokenSzoveg
            });
        }
    }
    public class LoginRequest
    {
        public string FelhNev { get; set; } = string.Empty;
        public string Jelszo { get; set; } = string.Empty;
    }
}