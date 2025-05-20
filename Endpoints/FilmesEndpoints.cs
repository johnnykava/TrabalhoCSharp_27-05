using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.Models;

namespace CatalogoDeFilmes.Endpoints
{
    //Get que mostra todos os filmes
    public static class FilmesEndpoints{
        public static void MapFilmesEndpoints(this WebApplication app){
            app.MapGet("/", () => "2ª Atividade Avalitiva - API Catalogo de Filmes");

            //GET que mostra todos os filmes
            app.MapGet("/filmes", async (AppDbContext db) =>
                await db.Filmes.ToListAsync());

            //GET que mostra um filme por ID
            app.MapGet("/filmes/{id}", async (int id, AppDbContext db) =>
                await db.Filmes.FindAsync(id) is Filme filme
                ? Results.Ok(filme)
                : Results.NotFound());

            //POST que cadastra o filme
            app.MapPost("/filmes", async (Filme filme, AppDbContext db) =>
            {
                db.Filmes.Add(filme);
                await db.SaveChangesAsync();
                return Results.Created($"/filmes/{filme.Id}", filme);
            });

            
        }
    }
}