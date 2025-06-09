namespace CatalogoDeFilmes.Models
{
    public class Filme
    {
        public int Id { get; set; }
        public required int Duracao { get; set; }
        public required string Titulo { get; set; }
        public required string Genero { get; set; }
        public required string Descricao { get; set; }
        public required string Diretor { get; set; }
    }
}