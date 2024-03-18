using LMS.Application.Service.Book;
using LMS.Application.Service.Borrow;
using LMS.Application.Service.Common;
using LMS.Application.Service.Payment;
using LMS.Application.Service.User;
using SD.LLBLGen.Pro.DQE.SqlServer;
using SD.LLBLGen.Pro.ORMSupportClasses;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICommonService, CommonService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IBorrowService, BorrowService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

var app = builder.Build();

var configuration = app.Configuration;


RuntimeConfiguration.ConfigureDQE<SQLServerDQEConfiguration>(c => c.AddDbProviderFactory(typeof(System.Data.SqlClient.SqlClientFactory)));
RuntimeConfiguration.AddConnectionString(configuration["ConnectionStrings:StringKey"], configuration["ConnectionStrings:DefaultConnection"]);
RuntimeConfiguration.ConfigureDQE<SQLServerDQEConfiguration>(c => c.SetDefaultCompatibilityLevel(SqlServerCompatibilityLevel.SqlServer2012));
RuntimeConfiguration.ConfigureDQE<SQLServerDQEConfiguration>(c => c.AddCatalogNameOverwrite("*", configuration["ConnectionStrings:CatalogNameToUse"]));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

