using Microsoft.EntityFrameworkCore;
using GetDataAsp.DataAccess.Context;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. DataAccess Layer - Configure DbContext with SQL Server
var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Register Generic Repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

// 3. Services Layer - Business Logic
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDanhMucDonViService, DanhMucDonViService>();
builder.Services.AddScoped<IDanhMucKinhDoanhService, DanhMucKinhDoanhService>();
builder.Services.AddScoped<IDanhMucDonViTinhService, DanhMucDonViTinhService>();
builder.Services.AddScoped<IDinhGiaService, DinhGiaService>();
builder.Services.AddScoped<IKeKhaiDangKyGiaService, KeKhaiDangKyGiaService>();
builder.Services.AddScoped<IGiaThiTruongService, GiaThiTruongService>();
builder.Services.AddScoped<IThamDinhGiaService, ThamDinhGiaService>();

// Configure CORS for Mobile / Web clients
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
