﻿using LMS.Application.Service.Common;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Application.WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CommonController: ControllerBase
    {
        ICommonService _commonService;

        public CommonController(ICommonService commonService)
        {
            _commonService = commonService;
        }

        [HttpGet]
        public IActionResult GetCustomerTblDetail(string Json)
        {
            try
            {
                var tblDetail = _commonService.getCustomerTblDetail(Json);
                return Ok(tblDetail);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetSpecificCustomerBrBooks(string Json)
        {
            try
            {
                var books = _commonService.getCustomerBorrowedBooks(Json);
                return Ok(books);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetCustomerPayments(string Json)
        {
            try
            {
                var payments = _commonService.getCustomerSpecificPayment(Json);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAdminDashboardData(string Json)
        {
            try
            {
                var dashboardData = _commonService.getAdminDashboardData(Json);
                return Ok(dashboardData);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
