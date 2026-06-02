using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace StreamTrack.Models;

public partial class StreamTrackContext : DbContext
{
    public StreamTrackContext()
    {
    }

    public StreamTrackContext(DbContextOptions<StreamTrackContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Ertekele> Ertekeles { get; set; }

    public virtual DbSet<Felhasznalo> Felhasznalos { get; set; }

    public virtual DbSet<Film> Films { get; set; }

    public virtual DbSet<Streamingplatform> Streamingplatforms { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=StreamTrack;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Ertekele>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("ertekeles");

            entity.HasIndex(e => e.FelhId, "felhID");

            entity.HasIndex(e => e.FilmId, "filmID");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.FelhId)
                .HasColumnType("int(11)")
                .HasColumnName("felhID");
            entity.Property(e => e.FilmId)
                .HasColumnType("int(11)")
                .HasColumnName("filmID");
            entity.Property(e => e.Pont).HasColumnType("int(11)");
            entity.Property(e => e.Velemeny).HasMaxLength(1000);

            entity.HasOne(d => d.Felh).WithMany(p => p.Ertekeles)
                .HasForeignKey(d => d.FelhId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ertekeles_ibfk_2");

            entity.HasOne(d => d.Film).WithMany(p => p.Ertekeles)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ertekeles_ibfk_1");
        });

        modelBuilder.Entity<Felhasznalo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("felhasznalo");

            entity.HasIndex(e => e.FelhNev, "FelhNev").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FelhNev).HasMaxLength(50);
            entity.Property(e => e.Jelszo).HasMaxLength(30);
        });

        modelBuilder.Entity<Film>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("film");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.Cim).HasMaxLength(200);
            entity.Property(e => e.Evad).HasColumnType("int(11)");
            entity.Property(e => e.Hossz).HasColumnType("int(11)");
            entity.Property(e => e.Leiras).HasMaxLength(1000);
            entity.Property(e => e.PlakatKep)
                .HasColumnType("blob")
                .HasColumnName("plakatKep");
            entity.Property(e => e.Resz).HasColumnType("int(11)");
            entity.Property(e => e.Tipus).HasMaxLength(20);
        });

        modelBuilder.Entity<Streamingplatform>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("streamingplatform");

            entity.HasIndex(e => e.FilmId, "filmId");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("ID");
            entity.Property(e => e.FilmId)
                .HasColumnType("int(11)")
                .HasColumnName("filmId");
            entity.Property(e => e.LogoUrl).HasMaxLength(1000);
            entity.Property(e => e.Nev).HasMaxLength(100);

            entity.HasOne(d => d.Film).WithMany(p => p.Streamingplatforms)
                .HasForeignKey(d => d.FilmId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("streamingplatform_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

