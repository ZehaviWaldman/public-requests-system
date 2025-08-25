using System.ComponentModel.DataAnnotations;

namespace PublicRequestsApi.Infrastructure.Entities
{
    public class Request
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = null!;

        [MinLength(5)]
        public string Subject { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}