using PublicRequestsApi.Application.Repositories;
using PublicRequestsApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace PublicRequestsApi.Infrastructure.Repositories
{
    public class RequestRepository : IRequestRepository
    {
        private readonly AppDbContext _context;

        public RequestRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Request>> GetAllAsync() =>
            await _context.Requests.ToListAsync();

        public async Task<Request?> GetByIdAsync(int id) =>
            await _context.Requests.FindAsync(id);

        public async Task AddAsync(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
        }
    }
}