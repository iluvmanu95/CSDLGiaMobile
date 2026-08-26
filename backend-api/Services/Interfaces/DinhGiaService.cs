using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GetDataAsp.Services.Interfaces
{
    public interface IDinhGiaService
    {
        Task<ApiResponse<IEnumerable<DinhGia>>> GetAllAsync(string? maNghe = null, string? trangThai = null, Guid? donViQuanLyId = null);
        Task<ApiResponse<DinhGia>> GetByIdAsync(Guid id);
    }

    public class DinhGiaService : IDinhGiaService
    {
        private readonly IRepository<DinhGia> _repo;

        public DinhGiaService(IRepository<DinhGia> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<DinhGia>>> GetAllAsync(string? maNghe = null, string? trangThai = null, Guid? donViQuanLyId = null)
        {
            try
            {
                var query = _repo.GetQueryable();
                if (!string.IsNullOrEmpty(maNghe))
                    query = query.Where(x => x.MaNghe == maNghe);
                if (!string.IsNullOrEmpty(trangThai))
                    query = query.Where(x => x.TrangThai == trangThai);
                if (donViQuanLyId.HasValue && donViQuanLyId != Guid.Empty)
                    query = query.Where(x => x.DonViQuanLyId == donViQuanLyId.Value);

                var list = await query.OrderByDescending(x => x.ThoiDiem).ToListAsync();
                return new ApiResponse<IEnumerable<DinhGia>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<DinhGia>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<DinhGia>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<DinhGia> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<DinhGia> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<DinhGia> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
