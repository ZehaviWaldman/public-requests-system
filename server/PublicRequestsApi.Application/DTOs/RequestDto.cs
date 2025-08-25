namespace PublicRequestsApi.Application.DTOs
{
    public class RequestDto
    {
        public string Name { get; set; } = null!;
        public string Subject { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}