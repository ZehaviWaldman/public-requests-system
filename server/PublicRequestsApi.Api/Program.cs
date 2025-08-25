using Microsoft.EntityFrameworkCore;
using PublicRequestsApi.Infrastructure;
using PublicRequestsApi.Application.Services;
using PublicRequestsApi.Infrastructure.Repositories;
using PublicRequestsApi.Application.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add EF InMemory
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("RequestsDb"));

// Add services
builder.Services.AddScoped<RequestService>();
// Add repositories
builder.Services.AddScoped<IRequestRepository, RequestRepository>();

// Add services
builder.Services.AddScoped<RequestService>();

// Add Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

app.Run();
