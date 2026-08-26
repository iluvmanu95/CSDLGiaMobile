using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GetDataAsp.Services.Interfaces
{
    public interface IDanhMucKinhDoanhService
    {
        Task<ApiResponse<IEnumerable<DanhMucKinhDoanh>>> GetAllAsync(string? maNganh = null, string? maNghe = null, string? loaiGia = null);
        Task<ApiResponse<DanhMucKinhDoanh>> GetByIdAsync(Guid id);
    }

    public class DanhMucKinhDoanhService : IDanhMucKinhDoanhService
    {
        private readonly IRepository<DanhMucKinhDoanh> _repo;

        public DanhMucKinhDoanhService(IRepository<DanhMucKinhDoanh> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<DanhMucKinhDoanh>>> GetAllAsync(string? maNganh = null, string? maNghe = null, string? loaiGia = null)
        {
            try
            {
                var query = _repo.GetQueryable();
                if (!string.IsNullOrEmpty(loaiGia))
                    query = query.Where(x => x.LoaiGia != null && x.LoaiGia.Contains(loaiGia));
                if (!string.IsNullOrEmpty(maNganh))
                    query = query.Where(x => x.MaNganh == maNganh);
                if (!string.IsNullOrEmpty(maNghe))
                    query = query.Where(x => x.MaNghe == maNghe);

                var list = await query
                    .OrderBy(x => x.SttsapXep)
                    .ThenBy(x => x.Level)
                    .ToListAsync();
                return new ApiResponse<IEnumerable<DanhMucKinhDoanh>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<DanhMucKinhDoanh>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<DanhMucKinhDoanh>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<DanhMucKinhDoanh> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<DanhMucKinhDoanh> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<DanhMucKinhDoanh> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
