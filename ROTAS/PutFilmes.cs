using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.Models;

namespace CatalogoDeFilmes.ROTAS
{
    public static class PutFilmes{
        public static void MapPutFilmes(this WebApplication app){

           //SET que edita um filme
            app.MapPut("/filmes/{id}", async (int id, Filme filmeAtt, AppDbContext db) =>
            {
                var filme = await db.Filmes.FindAsync(id);
                

                if (filme == null) {
                    return Results.NotFound($"Filme com ID {id} não encontrado.");
                }
                
                filme.Duracao = filmeAtt.Duracao;
                filme.Titulo = filmeAtt.Titulo;
                filme.Genero = filmeAtt.Genero;
                filme.Descricao = filmeAtt.Descricao;
                filme.Diretor = filmeAtt.Diretor;
                await db.SaveChangesAsync();
                return Results.Ok($"Filme com ID {id} Deletado.");
                
            }); 
        }
    }
}