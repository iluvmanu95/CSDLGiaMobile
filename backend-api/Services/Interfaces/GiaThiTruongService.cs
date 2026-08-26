using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GetDataAsp.Services.Interfaces
{
    public interface IGiaThiTruongService
    {
        Task<ApiResponse<IEnumerable<GiaThiTruong>>> GetAllAsync(string? thang = null, string? nam = null, string? trangThai = null, Guid? donViQuanLyId = null, Guid? diaBanId = null);
        Task<ApiResponse<GiaThiTruong>> GetByIdAsync(Guid id);
    }

    public class GiaThiTruongService : IGiaThiTruongService
    {
        private readonly IRepository<GiaThiTruong> _repo;

        public GiaThiTruongService(IRepository<GiaThiTruong> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<GiaThiTruong>>> GetAllAsync(string? thang = null, string? nam = null, string? trangThai = null, Guid? donViQuanLyId = null, Guid? diaBanId = null)
        {
            try
            {
                var query = _repo.GetQueryable();
                if (!string.IsNullOrEmpty(thang))
                    query = query.Where(x => x.Thang == thang);
                if (!string.IsNullOrEmpty(nam))
                    query = query.Where(x => x.Nam == nam);
                if (!string.IsNullOrEmpty(trangThai))
                    query = query.Where(x => x.TrangThai == trangThai);
                if (donViQuanLyId.HasValue && donViQuanLyId != Guid.Empty)
                    query = query.Where(x => x.DonViQuanLyId == donViQuanLyId.Value);
                if (diaBanId.HasValue && diaBanId != Guid.Empty)
                    query = query.Where(x => x.DiaBanId == diaBanId.Value);

                var list = await query.OrderByDescending(x => x.Thoidiem).ToListAsync();
                return new ApiResponse<IEnumerable<GiaThiTruong>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<GiaThiTruong>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<GiaThiTruong>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<GiaThiTruong> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<GiaThiTruong> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<GiaThiTruong> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
