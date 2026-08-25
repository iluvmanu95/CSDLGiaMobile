using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DanhMucDonViController : ControllerBase
    {
        private readonly IDanhMucDonViService _donViService;

        public DanhMucDonViController(IDanhMucDonViService donViService)
        {
            _donViService = donViService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? level)
        {
            if (level.HasValue)
            {
                var filtered = await _donViService.GetByLevelAsync(level.Value);
                if (!filtered.Success)
                {
                    return StatusCode(500, filtered);
                }
                return Ok(filtered);
            }

            var result = await _donViService.GetAllAsync();
            if (!result.Success)
            {
                return StatusCode(500, result);
            }
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var result = await _donViService.GetByIdAsync(id);
            if (!result.Success)
            {
                if (result.Message?.Contains("Không tìm thấy") == true)
                {
                    return NotFound(result);
                }
                return StatusCode(500, result);
            }
            return Ok(result);
        }
    }
}
