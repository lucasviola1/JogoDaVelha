using Microsoft.EntityFrameworkCore;

public class ResultadoService : IResultadoService
{
    private readonly AppDbContext _context;
    public ResultadoService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<List<Resultado>> GetAllResultado()
    {
        return await _context.Resultado.Where(u => u.vencedor == "O" || u.vencedor == "X").OrderByDescending(d => d.dataHora).Take(10).ToListAsync();
    }

    public async Task<Resultado> AddResultado(Resultado resultado)
    {
        _context.Resultado.Add(resultado);
        await _context.SaveChangesAsync();
        return resultado;
    }
}