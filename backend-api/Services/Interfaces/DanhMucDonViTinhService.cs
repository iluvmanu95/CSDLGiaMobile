using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;

namespace GetDataAsp.Services.Interfaces
{
    public interface IDanhMucDonViTinhService
    {
        Task<ApiResponse<IEnumerable<DanhMucDonViTinh>>> GetAllAsync();
        Task<ApiResponse<DanhMucDonViTinh>> GetByIdAsync(Guid id);
    }

    public class DanhMucDonViTinhService : IDanhMucDonViTinhService
    {
        private readonly IRepository<DanhMucDonViTinh> _repo;

        public DanhMucDonViTinhService(IRepository<DanhMucDonViTinh> repo)
        {
            _repo = repo;
        }

        public async Task<ApiResponse<IEnumerable<DanhMucDonViTinh>>> GetAllAsync()
        {
            try
            {
                var list = await _repo.GetAllAsync();
                return new ApiResponse<IEnumerable<DanhMucDonViTinh>> { Success = true, Data = list };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<DanhMucDonViTinh>> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }

        public async Task<ApiResponse<DanhMucDonViTinh>> GetByIdAsync(Guid id)
        {
            try
            {
                var item = await _repo.FindAsync(x => x.Id == id);
                if (item == null)
                    return new ApiResponse<DanhMucDonViTinh> { Success = false, Message = "Không tìm thấy dữ liệu." };
                return new ApiResponse<DanhMucDonViTinh> { Success = true, Data = item };
            }
            catch (Exception ex)
            {
                return new ApiResponse<DanhMucDonViTinh> { Success = false, Message = "Lỗi: " + ex.Message };
            }
        }
    }
}
