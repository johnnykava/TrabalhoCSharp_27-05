using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Models;

namespace CatalogoDeFilmes.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<Filme> Filmes { get; set; }
    }
}