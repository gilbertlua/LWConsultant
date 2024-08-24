using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using LWConsultantSQL;
using System.Data.Common;
namespace LWController.Controllers;

[ApiController]
[Route("[controller]")]

public class ItemController:ControllerBase{
    private readonly ILogger<ItemController> _logger;
    private readonly LWConsultantContext _db;

    public ItemController(ILogger<ItemController> logger)
    {
        _db = new LWConsultantContext();
        _logger = logger;
    }

    [HttpGet("Post test")]
    public async Task<bool> PostItem(Item item){
        _db.Items.Add( new Item{
            Description = item.Description
        });
        await _db.SaveChangesAsync();


        return true;
    }
}