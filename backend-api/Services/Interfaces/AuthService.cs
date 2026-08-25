using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;

namespace GetDataAsp.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<LoginResponse>> LoginAsync(LoginRequest request);
        Task<ApiResponse<User>> GetUserByUsernameAsync(string username);
    }

    public class AuthService : IAuthService
    {
        private readonly IRepository<User> _userRepo;

        public AuthService(IRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<ApiResponse<LoginResponse>> LoginAsync(LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            {
                return new ApiResponse<LoginResponse>
                {
                    Success = false,
                    Message = "Vui lòng nhập tên đăng nhập và mật khẩu."
                };
            }

            // Tìm user theo username
            var user = await _userRepo.FindAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return new ApiResponse<LoginResponse>
                {
                    Success = false,
                    Message = "Tên đăng nhập hoặc mật khẩu không đúng"
                };
            }

            // Kiểm tra mật khẩu (hỗ trợ BCrypt hoặc plain text)
            bool isPasswordValid = VerifyPassword(request.Password, user.Password);

            if (!isPasswordValid)
            {
                return new ApiResponse<LoginResponse>
                {
                    Success = false,
                    Message = "Tên đăng nhập hoặc mật khẩu không đúng"
                };
            }

            // Tạo token giả lập tương tự PHP
            byte[] randomBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
            }
            string token = Convert.ToBase64String(randomBytes);

            return new ApiResponse<LoginResponse>
            {
                Success = true,
                Message = "Đăng nhập thành công",
                Data = new LoginResponse
                {
                    User = user,
                    Token = token
                }
            };
        }

        public async Task<ApiResponse<User>> GetUserByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return new ApiResponse<User>
                {
                    Success = false,
                    Message = "Thiếu tham số username"
                };
            }

            var user = await _userRepo.FindAsync(u => u.Username == username);
            if (user == null)
            {
                return new ApiResponse<User>
                {
                    Success = false,
                    Message = "Không tìm thấy người dùng"
                };
            }

            return new ApiResponse<User>
            {
                Success = true,
                Data = user
            };
        }

        private static bool VerifyPassword(string inputPassword, string? storedPassword)
        {
            if (string.IsNullOrEmpty(storedPassword)) return false;

            // 1. Kiểm tra nếu là mã băm BCrypt ($2a$, $2b$, $2y$)
            if (storedPassword.StartsWith("$2a$") || storedPassword.StartsWith("$2b$") || storedPassword.StartsWith("$2y$"))
            {
                try
                {
                    return BCrypt.Net.BCrypt.Verify(inputPassword, storedPassword);
                }
                catch
                {
                    return false;
                }
            }

            // 2. So sánh trực tiếp chuỗi (nếu lưu mật khẩu chưa mã hóa)
            return inputPassword == storedPassword;
        }
    }
}
