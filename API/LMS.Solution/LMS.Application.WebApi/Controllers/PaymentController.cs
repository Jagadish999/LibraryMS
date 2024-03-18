using LMS.Application.Service.Payment;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Application.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PaymentController: ControllerBase
    {

        IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public IActionResult GetPaymentDetailSel(string Json)
        {
            try
            {
                var payments = _paymentService.paymentTransactionSel(Json);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
