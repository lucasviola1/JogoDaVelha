public interface IResultadoService
{
    Task<List<Resultado>> GetAllResultado();
    Task<Resultado> AddResultado(Resultado resultado);
}