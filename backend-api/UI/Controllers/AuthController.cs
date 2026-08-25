using Microsoft.AspNetCore.Mvc;
using GetDataAsp.Services.DTOs;
using GetDataAsp.Services.Interfaces;

namespace GetDataAsp.UI.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            if (!result.Success)
            {
                return Unauthorized(result);
            }
            return Ok(result);
        }

        [HttpGet("getUsers")]
        public async Task<IActionResult> GetUsers([FromQuery] string username)
        {
            var result = await _authService.GetUserByUsernameAsync(username);
            if (!result.Success)
            {
                if (result.Message == "Thiếu tham số username")
                {
                    return BadRequest(result);
                }
                return NotFound(result);
            }
            return Ok(result);
        }
    }
}
