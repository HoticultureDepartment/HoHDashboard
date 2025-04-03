using HoHDashboard.server.Repository.IRepository;
using HoHDashboard.server.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Azure.Core.HttpHeader;

namespace HoHDashboard.server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonTypeController(ICommonTypeRepository common, IConfiguration config) : ControllerBase
    {
        private readonly ICommonTypeRepository _common = common;
        private readonly IConfiguration _config = config;
        [HttpGet("users")]
        public IActionResult Users()
        {
            var data = _common.GetUserList();
            return Ok(data);
        }

        [HttpGet("beneficiaries")]
        public IActionResult Beneficiaries()
        {
            var data = _common.GetBeneficiaryList();
            return Ok(data);
        }
        [HttpGet("fySubsidyAmount")]
        public IActionResult SubsidyAmount()
        {
            var data = _common.GetFyYearSubsidyAmount();
            return Ok(data);
        }
        [HttpPost("addComponent")]
        public IActionResult AddComponent([FromBody] ComponentViewModel vmodel)
        {
            string res = _common.AddComponent(vmodel);
            return Ok(new { success = true, message = res });
        }
        [HttpGet("components")]
        public IActionResult Components()
        {
            var res = _common.ComponentList();
            return Ok(res);
        }
    }
}