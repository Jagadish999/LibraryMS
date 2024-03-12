using LMS.Application.Model;
using LMS.Application.Service.User;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Application.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController: ControllerBase
    {

        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUser(string Json)
        {
            try
            {
                var user = _userService.getSpecificUser(Json);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CustomerUserTsk([FromBody] MvJson json)
        {
            try
            {
                var userCustomer = _userService.customerUserTsk(json.Json);
                return Ok(userCustomer);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
