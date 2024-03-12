using LMS.Application.Service.Book;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Application.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BookController: ControllerBase
    {

        IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public IActionResult GetBookDetils(string Json)
        {
            try
            {
                var bookDetail = _bookService.getBookSel(Json);
                return Ok(bookDetail);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
