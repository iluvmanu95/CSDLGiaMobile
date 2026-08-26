using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GetDataAsp.Services.Interfaces
{
    public interface IThamDinhGiaService
    {
        Task<ApiResponse<IEnumerable<ThamDinhGia>>> GetAllAsync(string? trangThai = null, Guid? donViQuanLyId = null, Guid? diaBanId = null);
        Task<ApiResponse<ThamDinhGia>> GetByIdAsync(Guid id);
    }

    public class ThamDinhGiaService : IThamDinhGiaService
    {
        private readonly IRepository<ThamDinhGia> _repo;

        public ThamDinhGiaService(IRepository<ThamDinhGia> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<ThamDinhGia>>> GetAllAsync(string? trangThai = null, Guid? donViQuanLyId = null, Guid? diaBanId = null)
        {
            try
            {
                var query = _repo.GetQueryable();
                if (!string.IsNullOrEmpty(trangThai))
                    query = query.Where(x => x.TrangThai == trangThai);
                if (donViQuanLyId.HasValue && donViQuanLyId != Guid.Empty)
                    query = query.Where(x => x.DonViQuanLyId == donViQuanLyId.Value);
                if (diaBanId.HasValue && diaBanId != Guid.Empty)
                    query = query.Where(x => x.DiaBanId == diaBanId.Value);

                var list = await query.OrderByDescending(x => x.Thoidiem).ToListAsync();
                return new ApiResponse<IEnumerable<ThamDinhGia>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<ThamDinhGia>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<ThamDinhGia>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<ThamDinhGia> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<ThamDinhGia> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<ThamDinhGia> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
