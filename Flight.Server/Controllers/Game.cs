using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace Flight.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GameController : ControllerBase
    {
        public static Dictionary<string, int> numerosCorretos = new Dictionary<string, int>();
        public static Dictionary<string, CheckIfCorrectResult> stats = new Dictionary<string, CheckIfCorrectResult>();
        private readonly ILogger<GameController> _logger;

        public GameController(ILogger<GameController> logger)
        {
            _logger = logger;
        }
        [HttpGet("Placar")]
        public async Task<List<PlacarItem>> GetPlacar()
        {
            List<PlacarItem> placarItens = new();
            //TODO: DBCONFIG IN A SEPARATED FILE
            //TODO: DEAL WITH CONNECTIONS OUTSIDE OF CONTROLLERS ON A SEPARATED FILE
            string connectionString = "Host=localhost;"
                                    + "Port=5432;"
                                    + "Database=postgres;"
                                    + "User Id=postgres;"
                                    + "Password=Careca12;";
            using NpgsqlConnection connection = new NpgsqlConnection(connectionString);
            connection.Open();
            string command = "SELECT NOME, PONTUACAO FROM placar order by pontuacao asc, id desc LIMIT 10;";
            using NpgsqlCommand cmd = new NpgsqlCommand(command, connection);
            using NpgsqlDataReader reader = cmd.ExecuteReader();

            int posicao = 0;
            while (reader.Read())
            {
                posicao++;
                PlacarItem placarItem = new();
                placarItem.Posicao = posicao;
                placarItem.Nome = reader["nome"].ToString()!;
                placarItem.Pontuacao = Convert.ToInt32(reader["pontuacao"])!;
                placarItens.Add(placarItem);
            }
            await connection.CloseAsync();

            return placarItens;
        }

        [HttpPost("CheckIfCorrect")]
        public async Task<CheckIfCorrectResult> CheckIfCorrectAsync(CheckIfCorrectRequest req)
        {
            CheckIfCorrectResult ret = new();
            bool binario = true; //TODO: DIFERENTE MODO DE JOGO
                                 //cria um novo se não existir
            if (!numerosCorretos.ContainsKey(req.Token))
            {
                req.Token = Guid.NewGuid().ToString();
                numerosCorretos.Add(req.Token, new Random().Next(1, 101));
                stats.Add(req.Token, ret);
            }
            ret = stats[req.Token];
            ret.Token = req.Token;
            ret.CurrentRecord++;
            int numeroCorreto = numerosCorretos[req.Token];
            if (req.Numero == numeroCorreto)
            {
                ret.State = "correct";
                ret.Mensagem = "Acertou";
                ret.EmojiDistance = "😎";
                ret.EmojiDirection = "";
                //TODO: DBCONFIG IN A SEPARATED FILE
                //TODO: DEAL WITH CONNECTIONS OUTSIDE OF CONTROLLERS ON A SEPARATED FILE
                string connectionString = "Host=localhost;"
                                        + "Port=5432;"
                                        + "Database=postgres;"
                                        + "User Id=postgres;"
                                        + "Password=Careca12;";
                using NpgsqlConnection connection = new NpgsqlConnection(connectionString);
                connection.Open();
                string command = "INSERT INTO placar (nome, pontuacao) VALUES (@nome, @pontuacao)";
                using NpgsqlCommand cmd = new NpgsqlCommand(command, connection);
                cmd.Parameters.AddWithValue("@nome", req.Nome);
                cmd.Parameters.AddWithValue("@pontuacao", ret.CurrentRecord);
                await cmd.ExecuteNonQueryAsync();
                await connection.CloseAsync();

                // para se certificar que só da para vencer uma vez por token
                numerosCorretos.Remove(req.Token);
                stats.Remove(req.Token);
            }
            else
            {
                ret.State = "incorrect";
                ret.EmojiDistance = "🥴";
                ret.Mensagem = "Errou";
            }
            if (binario)
            {
                if (req.Numero < numeroCorreto)
                {
                    ret.EmojiDirection = "👆";
                    ret.Mensagem = "Maior";
                }
                else if (req.Numero > numeroCorreto)
                {
                    ret.EmojiDirection = "👇";
                    ret.Mensagem = "Menor";
                }
                if (numeroCorreto - req.Numero == 1 || numeroCorreto - req.Numero == -1)
                {
                    ret.EmojiDirection = "🤏";
                }
            }
            return ret;
        }
    }
    public class PlacarItem
    {
        public int Posicao { get; set; }
        public string Nome { get; set; } = "";
        public int Pontuacao { get; set; }
    }
    public class CheckIfCorrectResult
    {
        public string Token { get; set; } = "";
        public string State { get; set; } = "";
        public string Mensagem { get; set; } = "";
        public string EmojiDistance { get; set; } = "";
        public string EmojiDirection { get; set; } = "";
        public int CurrentRecord { get; set; }
        // public int topRecord { get; set; }
        public string Nome { get; set; } = "";
    }
    public class CheckIfCorrectRequest
    {
        public string Token { get; set; } = "";
        public int Numero { get; set; }
        public string Nome { get; set; } = "";
    }
}
