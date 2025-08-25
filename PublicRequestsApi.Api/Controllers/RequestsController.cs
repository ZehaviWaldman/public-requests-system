using Microsoft.AspNetCore.Mvc;
using PublicRequestsApi.Application.DTOs;
using PublicRequestsApi.Application.Services;

namespace PublicRequestsApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : ControllerBase
    {
        private readonly RequestService _service;

        public RequestsController(RequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var requests = await _service.GetAllAsync();
            var dtos = requests.Select(r => new RequestResponseDto
            {
                Id = r.Id,
                Name = r.Name,
                Subject = r.Subject,
                Content = r.Content,
                CreatedAt = r.CreatedAt
            });
            return Ok(dtos);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RequestDto dto)
        {
            try
            {
                var request = await _service.AddAsync(dto.Name, dto.Subject, dto.Content);
                return Ok(request);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }
}
