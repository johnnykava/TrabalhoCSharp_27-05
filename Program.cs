using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.ROTAS;

var builder = WebApplication.CreateBuilder(args);

// Configura o DbContext
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=filmes.db"));

// ** Adiciona o Swagger **
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ** Configura o middleware do Swagger **
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();       // Gera o JSON da documentação
    app.UseSwaggerUI();     // Exibe a interface do Swagger no navegador
}

//app.MapFilmesEndpoints();
app.MapGetFilmes();
app.MapSetFilmes();
app.MapPostFilmes();
app.MapDeleteFilmes();

app.Run();
