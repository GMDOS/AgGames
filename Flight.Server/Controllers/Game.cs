using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("CheckIfCorrect")]
        public CheckIfCorrectResult CheckIfCorrect(int numero, string token = "")
        {
            CheckIfCorrectResult result = new();
            bool binario = true; //TODO: DIFERENTE MODO DE JOGO
            //cria um novo se não existir
            if (!numerosCorretos.ContainsKey(token))
            {
                token = Guid.NewGuid().ToString();
                numerosCorretos.Add(token, new Random().Next(1, 101));
                stats.Add(token, result);
            }
            result = stats[token];
            result.token = token;
            result.currentRecord++;
            int numeroCorreto = numerosCorretos[token];
            if (numero == numeroCorreto)
            {
                result.state = "correct";
                result.mensagem = "Acertou";
                result.emojiDistance = "😎";
                result.emojiDirection = "";
                //TODO: SAVE RESULT IN THE DB

                // para se certificar que só da para vencer uma vez por token
                numerosCorretos.Remove(token);
                stats.Remove(token);
            }
            else
            {
                result.state = "incorrect";
                result.emojiDistance = "🥴";
                result.mensagem = "Errou";
            }
            if (binario)
            {
                if (numero < numeroCorreto)
                {
                    result.emojiDirection = "👆";
                    result.mensagem = "Maior";
                }
                else if (numero > numeroCorreto)
                {
                    result.emojiDirection = "👇";
                    result.mensagem = "Menor";
                }
                if (numeroCorreto - numero == 1 || numeroCorreto - numero == -1)
                {
                    result.emojiDirection = "🤏";
                }
            }
            return result;
        }
    }
    public class CheckIfCorrectResult
    {
        public string token { get; set; } = "";
        public string state { get; set; } = "";
        public string mensagem { get; set; } = "";
        public string emojiDistance { get; set; } = "";
        public string emojiDirection { get; set; } = "";
        public int currentRecord { get; set; }
        // public int topRecord { get; set; }
        public string nome { get; set; } = "";
    }
}
