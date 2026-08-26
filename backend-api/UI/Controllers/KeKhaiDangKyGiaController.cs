using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KeKhaiDangKyGiaController : ControllerBase
    {
        private readonly IKeKhaiDangKyGiaService _service;

        public KeKhaiDangKyGiaController(IKeKhaiDangKyGiaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? maNghe, [FromQuery] string? phanLoai, [FromQuery] string? trangThai, [FromQuery] Guid? doanhNghiepQuanLyId, [FromQuery] Guid? donViQuanLyId)
        {
            var result = await _service.GetAllAsync(maNghe, phanLoai, trangThai, doanhNghiepQuanLyId, donViQuanLyId);
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
