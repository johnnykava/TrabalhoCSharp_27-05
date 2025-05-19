namespace CatalogoDeFilmes.Models
{
    public class Filme
    {
        public int Id { get; set; }
        public int Duracao { get; set; }
        public string Titulo { get; set; }
        public string Genero { get; set; }
        public string Descricao { get; set; }
    }
}