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

        [HttpPost("CheckIfCorrect")]
        public CheckIfCorrectResult CheckIfCorrect(CheckIfCorrectRequest req)
        {
            CheckIfCorrectResult result = new();
            bool binario = true; //TODO: DIFERENTE MODO DE JOGO
            //cria um novo se não existir
            if (!numerosCorretos.ContainsKey(req.Token))
            {
                req.Token = Guid.NewGuid().ToString();
                numerosCorretos.Add(req.Token, new Random().Next(1, 101));
                stats.Add(req.Token, result);
            }
            result = stats[req.Token];
            result.Token = req.Token;
            result.CurrentRecord++;
            int numeroCorreto = numerosCorretos[req.Token];
            if (req.Numero == numeroCorreto)
            {
                result.State = "correct";
                result.Mensagem = "Acertou";
                result.EmojiDistance = "😎";
                result.EmojiDirection = "";
                //TODO: SAVE RESULT IN THE DB

                // para se certificar que só da para vencer uma vez por token
                numerosCorretos.Remove(req.Token);
                stats.Remove(req.Token);
            }
            else
            {
                result.State = "incorrect";
                result.EmojiDistance = "🥴";
                result.Mensagem = "Errou";
            }
            if (binario)
            {
                if (req.Numero < numeroCorreto)
                {
                    result.EmojiDirection = "👆";
                    result.Mensagem = "Maior";
                }
                else if (req.Numero > numeroCorreto)
                {
                    result.EmojiDirection = "👇";
                    result.Mensagem = "Menor";
                }
                if (numeroCorreto - req.Numero == 1 || numeroCorreto - req.Numero == -1)
                {
                    result.EmojiDirection = "🤏";
                }
            }
            return result;
        }
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
