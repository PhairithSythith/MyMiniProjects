using System;
using System.Collections.Generic;

namespace StreamTrack.Models;

public partial class Ertekele
{
    public int Id { get; set; }

    public int? Pont { get; set; }

    public string? Velemeny { get; set; }

    public DateOnly? Datum { get; set; }

    public int? FilmId { get; set; }

    public int? FelhId { get; set; }

    public virtual Felhasznalo? Felh { get; set; }

    public virtual Film? Film { get; set; }

}
