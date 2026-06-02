using System;
using System.Collections.Generic;

namespace StreamTrack.Models;

public partial class Streamingplatform
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string LogoUrl { get; set; } = null!;

    public int? FilmId { get; set; }

    public virtual Film? Film { get; set; }
}
