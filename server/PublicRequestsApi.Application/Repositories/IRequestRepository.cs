using PublicRequestsApi.Infrastructure.Entities;

namespace PublicRequestsApi.Application.Repositories
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> GetAllAsync();
        Task<Request?> GetByIdAsync(int id);
        Task AddAsync(Request request);
    }
}