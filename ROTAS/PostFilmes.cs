using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.Models;

namespace CatalogoDeFilmes.ROTAS
{

    public static class PostFilmes{
        public static void MapPostFilmes(this WebApplication app){

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