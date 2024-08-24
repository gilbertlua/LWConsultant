using System;
using System.Linq;
using System.Reflection;
using LWConsultantSQL;

using var db = new LWConsultantContext();

Console.WriteLine($"Database path: {db.DbPath}.");

db.Add( new Item{
    Description = "lorem ipsum",
});

db.SaveChanges();

var items = db.Items
                .OrderBy( b => b.ItemId)
                .First();
                

items.Keyword.Add(
    new Keyword{
        Title = "ini keywoard pertama"
    }
);
db.SaveChanges();