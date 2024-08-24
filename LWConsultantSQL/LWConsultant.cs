using Microsoft.EntityFrameworkCore;
using System;

namespace LWConsultantSQL;

public class LWConsultantContext:DbContext
{
    public DbSet<Item> Items { get; set;}
    public DbSet<Keyword> Keywords { get; set;}
    public string DbPath { get; }
    public LWConsultantContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = Path.Join(path, "lwconsultants.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}
