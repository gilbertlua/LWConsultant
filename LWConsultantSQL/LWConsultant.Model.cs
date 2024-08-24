namespace LWConsultantSQL;

public class Item
{
    public int ItemId { get; set; }
    public string? Description { get; set; }

    public List<Keyword> Keyword { get; } = new();
}

public class Keyword
{
    public int KeywordId { get; set; }
    public string? Title { get; set; }
    public int ItemId { get; set; }
}