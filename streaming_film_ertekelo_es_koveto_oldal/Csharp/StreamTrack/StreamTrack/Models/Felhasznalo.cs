using System;
using System.Collections.Generic;

namespace StreamTrack.Models;

public partial class Felhasznalo
{
    public int Id { get; set; }

    public string Jelszo { get; set; } = null!;

    public string FelhNev { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<Ertekele> Ertekeles { get; set; } = new List<Ertekele>();
}
