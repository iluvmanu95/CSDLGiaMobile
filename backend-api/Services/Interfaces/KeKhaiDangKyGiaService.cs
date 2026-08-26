using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GetDataAsp.Services.Interfaces
{
    public interface IKeKhaiDangKyGiaService
    {
        Task<ApiResponse<IEnumerable<KeKhaiDangKyGia>>> GetAllAsync(string? maNghe = null, string? phanLoai = null, string? trangThai = null, Guid? doanhNghiepQuanLyId = null, Guid? donViQuanLyId = null);
        Task<ApiResponse<KeKhaiDangKyGia>> GetByIdAsync(Guid id);
    }

    public class KeKhaiDangKyGiaService : IKeKhaiDangKyGiaService
    {
        private readonly IRepository<KeKhaiDangKyGia> _repo;

        public KeKhaiDangKyGiaService(IRepository<KeKhaiDangKyGia> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<KeKhaiDangKyGia>>> GetAllAsync(string? maNghe = null, string? phanLoai = null, string? trangThai = null, Guid? doanhNghiepQuanLyId = null, Guid? donViQuanLyId = null)
        {
            try
            {
                var query = _repo.GetQueryable();
                if (!string.IsNullOrEmpty(maNghe))
                    query = query.Where(x => x.MaNghe == maNghe);
                if (!string.IsNullOrEmpty(phanLoai))
                    query = query.Where(x => x.PhanLoai == phanLoai);
                if (!string.IsNullOrEmpty(trangThai))
                    query = query.Where(x => x.TrangThai == trangThai);
                if (doanhNghiepQuanLyId.HasValue && doanhNghiepQuanLyId != Guid.Empty)
                    query = query.Where(x => x.DoanhNghiepQuanLyId == doanhNghiepQuanLyId.Value);
                if (donViQuanLyId.HasValue && donViQuanLyId != Guid.Empty)
                    query = query.Where(x => x.DonViQuanLyId == donViQuanLyId.Value);

                var list = await query.OrderByDescending(x => x.ThoiDiem).ToListAsync();
                return new ApiResponse<IEnumerable<KeKhaiDangKyGia>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<KeKhaiDangKyGia>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<KeKhaiDangKyGia>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<KeKhaiDangKyGia> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<KeKhaiDangKyGia> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<KeKhaiDangKyGia> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
