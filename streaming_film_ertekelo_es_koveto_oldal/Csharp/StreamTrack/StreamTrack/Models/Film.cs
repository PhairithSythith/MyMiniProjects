using System;
using System.Collections.Generic;

namespace StreamTrack.Models;

public partial class Film
{
    public string Cim { get; set; } = null!;

    public string? Leiras { get; set; }

    public int? Hossz { get; set; }

    public int? Evad { get; set; }

    public int? Resz { get; set; }

    public string Tipus { get; set; } = null!;

    public byte[] PlakatKep { get; set; } = null!;

    public int Id { get; set; }

    public virtual ICollection<Ertekele> Ertekeles { get; set; } = new List<Ertekele>();

    public virtual ICollection<Streamingplatform> Streamingplatforms { get; set; } = new List<Streamingplatform>();
}
