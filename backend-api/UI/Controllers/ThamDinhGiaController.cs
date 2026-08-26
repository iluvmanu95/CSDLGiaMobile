using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThamDinhGiaController : ControllerBase
    {
        private readonly IThamDinhGiaService _service;

        public ThamDinhGiaController(IThamDinhGiaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? trangThai, [FromQuery] Guid? donViQuanLyId, [FromQuery] Guid? diaBanId)
        {
            var result = await _service.GetAllAsync(trangThai, donViQuanLyId, diaBanId);
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
