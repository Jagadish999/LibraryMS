using LMS.Application.Model;
using LMS.Application.Service.Borrow;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Application.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BorrowController : ControllerBase
    {
        IBorrowService _borrowService;

        public BorrowController(IBorrowService borrowService)
        {
            _borrowService = borrowService;
        }

        [HttpGet]
        public IActionResult GetBorrowDetail(string Json)
        {
            try
            {
                var borrowData = _borrowService.borrowSel(Json);
                return Ok(borrowData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        public IActionResult GetBorrowTransactionDetail(string Json)
        {
            try
            {
                var borrowData = _borrowService.borrowTransactionSel(Json);
                return Ok(borrowData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult SetBorrowDetail([FromBody] MvJson json)
        {
            try
            {
                var borrowData = _borrowService.borrowTsk(json.Json);
                return Ok(borrowData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
