using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using LWConsultantSQL;
using System.Data.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore;
namespace LWController.Controllers;

[ApiController]
[Route("[controller]")]

public class ItemController:ControllerBase{
    private readonly ILogger<ItemController> _logger;
    private readonly LWConsultantContext _db;
    private readonly string _uploadFolderPath = "Upload";


    public ItemController(ILogger<ItemController> logger)
    {
        _db = new LWConsultantContext();
        _db.Database.Migrate();
        _logger = logger;
    }


    [HttpPost("AddPdfFile")]
    public async Task<IActionResult> AddPdfFile(IFormFile file){
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file was uploaded.");
        }
        if (!Directory.Exists(_uploadFolderPath))
        {
            Directory.CreateDirectory(_uploadFolderPath);
        }
        var filePath = Path.Combine(_uploadFolderPath, file.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return Ok(new { Message = "File uploaded successfully.", fileName = file.FileName });
    }

    [HttpGet("getpdffile/{url}")]
    public  IActionResult GetPdffile(string url){        
        if (System.IO.File.Exists(url))
        {
            var fileBytes = System.IO.File.ReadAllBytes(url);
            return File(fileBytes, "application/pdf", url);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost("CreateItem")]
    public async Task<IActionResult> CreateItem(string description,string pasal, string urlpdf ){
        Item item = new Item{
            Description = description,
            Pasal = pasal,
            UrlPDF = urlpdf
        };    
        _db.Items.Add(item);
        await _db.SaveChangesAsync();
        return Ok(item);
    }
    
    [HttpDelete("DeleteItem")]
    public async Task<IActionResult> DeleteItem(int id){
        var item = await _db.Items.FindAsync(id);
        if (item == null)
        {
            return BadRequest("item not faund"); 
        }
        _db.Items.Remove(item);
        await _db.SaveChangesAsync();
        return Ok("deleted succesfully");

    }



    [HttpPost("CreateKeyword")]
    public  async Task<IActionResult> CreateKeywoard(int itemId, List<string> keys){
        var item = _db.Items.Where(b => b.ItemId == itemId ).First();
            foreach(var key in keys){
                item.Keywords!.Add(new Keyword{
                    Title = key
                });
            }
            await _db.SaveChangesAsync();
        
        return Ok();
    }
    [HttpGet("GetItems")]
    public  ICollection<Item> GetItemsAsync(){        
        var items = _db.Items.ToList();
        return items;
    }

    [HttpGet("GetKeywords")]
    public ICollection<Keyword> GetKeywoards(){
        var keys = _db.Keywords.ToList();
        return keys;
    }

    [HttpGet("GetKeywordsItem")]
    public ICollection<Keyword> GetKeywordsItem(int itemId){
        var keys = _db.Keywords.Where(item => item.ItemId ==itemId);
        return keys.ToList();
    }
    [HttpGet("GetItemsKeyword")]
    public ICollection<Item> GetItemsKeyword(string key){
        var items = _db.Items.Where(item => item.Keywords!.Any(kw => kw.Title!.ToLower().Contains(key.ToLower())));
        return items.ToList();
    }
}