var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthorization(); 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var allowSpec = "myspec";

builder.Services.AddCors(options => {
    options.AddPolicy(name:allowSpec, policy =>{
        policy.WithOrigins("http://localhost:3000","http://localhost:3002","http://192.168.18.8:3000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});


var app = builder.Build();
app.UseCors(allowSpec);
app.UseSwagger();
app.UseSwaggerUI();
app.UseDefaultFiles();
app.UseStaticFiles();
var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
app.UseStaticFiles(new StaticFileOptions{
    RequestPath = "/files"
});
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
