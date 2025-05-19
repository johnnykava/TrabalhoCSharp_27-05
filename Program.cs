using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;

var builder = WebApplication.CreateBuilder(args);

//Adiciona o serviço que se conecta com o banco de dados o "AppDbContext"
//O AppDbContext diz:
//Qual classe vira tabela "Filme"
//E usar o Sqlite
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=filmes.db"));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
