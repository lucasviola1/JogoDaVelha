using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ResultadoController : ControllerBase
{
    private readonly IResultadoService _service;
    public ResultadoController(IResultadoService service)
    {
        _service = service;
    }

    [Route("/getresultados")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var produtos = await _service.GetAllResultado();
        return Ok(produtos);
    }

    [Route("/addresultado")]
    [HttpPost]
    public async Task<IActionResult> Add([FromBody] Resultado res)
    {
        var novoProduto = await _service.AddResultado(res);

        return Ok(novoProduto);
    }

}
