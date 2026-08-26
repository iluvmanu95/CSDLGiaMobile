using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DanhMucDonViTinhController : ControllerBase
    {
        private readonly IDanhMucDonViTinhService _service;

        public DanhMucDonViTinhController(IDanhMucDonViTinhService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            if (!result.Success) return StatusCode(500, result);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _service.GetByIdAsync(id);
            if (!result.Success)
            {
                if (result.Message?.Contains("Không tìm thấy") == true) return NotFound(result);
                return StatusCode(500, result);
            }
            return Ok(result);
        }
    }
}
