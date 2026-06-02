namespace StreamTrack.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string StreamingPlatform { get; set; } = string.Empty;
        public string PosterUrl { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // "Movie" vagy "Series"
    }
}
