using Microsoft.EntityFrameworkCore;
using PublicRequestsApi.Infrastructure.Entities;
using System.Collections.Generic;

namespace PublicRequestsApi.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Request> Requests { get; set; }
    }
}
