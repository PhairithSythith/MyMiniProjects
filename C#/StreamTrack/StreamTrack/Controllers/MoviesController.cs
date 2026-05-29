using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StreamTrack.Models;

namespace StreamTrack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private static readonly List<Movie> MockMovies = new List<Movie>
        {
            new Movie { Id = 1, Title = "Stranger Things", Description = "Rejtélyes dolgok egy kisvárosban.", StreamingPlatform = "Netflix", Type = "Series" },
            new Movie { Id = 2, Title = "Dűne: Második rész", Description = "Paul Atreides bosszúja.", StreamingPlatform = "HBO Max", Type = "Movie" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Movie>> GetMovies()
        {
            return Ok(MockMovies);
        }
    }
}
