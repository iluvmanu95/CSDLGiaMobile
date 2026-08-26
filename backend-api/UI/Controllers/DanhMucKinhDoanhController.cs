using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DanhMucKinhDoanhController : ControllerBase
    {
        private readonly IDanhMucKinhDoanhService _service;

        public DanhMucKinhDoanhController(IDanhMucKinhDoanhService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? maNganh, [FromQuery] string? maNghe, [FromQuery] string? loaiGia)
        {
            var result = await _service.GetAllAsync(maNganh, maNghe, loaiGia);
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
