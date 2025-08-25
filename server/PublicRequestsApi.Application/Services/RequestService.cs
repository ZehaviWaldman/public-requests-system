using PublicRequestsApi.Application.Repositories;
using PublicRequestsApi.Infrastructure.Entities;
namespace PublicRequestsApi.Application.Services
{
    public class RequestService

    {
        private readonly IRequestRepository _repository;

        public RequestService(IRequestRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Request>> GetAllAsync()
        {
            return (await _repository.GetAllAsync()).ToList();
        }

        public async Task<Request> AddAsync(string name, string subject, string content)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("שם הפונה חובה");
            if(string.IsNullOrWhiteSpace(name)||subject.Length<5)
            {

                throw new ArgumentException("נושא הפנייה חייב להיות לפחות 5 תווים");
            }
            var req = new Request
            {
                Name = name,
                Subject = subject,
                Content = content,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(req);
            return req;
        }
    }
}