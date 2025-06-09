using Microsoft.EntityFrameworkCore;
using CatalogoDeFilmes.Data;
using CatalogoDeFilmes.ROTAS;
using Microsoft.Extensions.FileProviders;

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
app.MapPutFilmes();
app.MapPostFilmes();
app.MapDeleteFilmes();

app.UseDefaultFiles();  // Procura por index.html automaticamente
app.UseStaticFiles();   // Permite servir arquivos da pasta wwwroot

app.Run();
