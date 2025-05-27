using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.Models;

namespace CatalogoDeFilmes.ROTAS
{
    public static class DeleteFilmes{
        public static void MapDeleteFilmes(this WebApplication app){

            //DELETE que deleta um filme
            app.MapDelete("/delete/{id}", async (int id, AppDbContext db) =>
            {
                var filme = await db.Filmes.FindAsync(id);
                

                if (filme == null) {
                    return Results.NotFound($"Filme com ID {id} não encontrado.");
                }
                
                db.Filmes.Remove(filme);
                await db.SaveChangesAsync();
                return Results.Ok($"Filme com ID {id} Deletado.");
                
            });
           
            
        }
    }
}