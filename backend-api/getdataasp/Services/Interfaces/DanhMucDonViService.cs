using GetDataAsp.DataAccess.Entities;
using GetDataAsp.DataAccess.Repositories;
using GetDataAsp.Services.DTOs;

namespace GetDataAsp.Services.Interfaces
{
    public interface IDanhMucDonViService
    {
        Task<ApiResponse<IEnumerable<DanhMucDonVi>>> GetAllAsync();
        Task<ApiResponse<DanhMucDonVi>> GetByIdAsync(Guid id);
        Task<ApiResponse<IEnumerable<DanhMucDonVi>>> GetByLevelAsync(int level);
    }

    public class DanhMucDonViService : IDanhMucDonViService
    {
        private readonly IRepository<DanhMucDonVi> _donViRepo;

        public DanhMucDonViService(IRepository<DanhMucDonVi> donViRepo)
        {
            _donViRepo = donViRepo;
        }

        public async Task<ApiResponse<IEnumerable<DanhMucDonVi>>> GetAllAsync()
        {
            try
            {
                var list = await _donViRepo.GetAllAsync();
                return new ApiResponse<IEnumerable<DanhMucDonVi>>
                {
                    Success = true,
                    Data = list
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<DanhMucDonVi>>
                {
                    Success = false,
                    Message = "Lỗi khi lấy danh mục đơn vị: " + ex.Message
                };
            }
        }

        public async Task<ApiResponse<DanhMucDonVi>> GetByIdAsync(Guid id)
        {
            try
            {
                var donVi = await _donViRepo.FindAsync(x => x.Id == id);
                if (donVi == null)
                {
                    return new ApiResponse<DanhMucDonVi>
                    {
                        Success = false,
                        Message = "Không tìm thấy đơn vị với mã ID này."
                    };
                }

                return new ApiResponse<DanhMucDonVi>
                {
                    Success = true,
                    Data = donVi
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<DanhMucDonVi>
                {
                    Success = false,
                    Message = "Lỗi khi lấy thông tin đơn vị: " + ex.Message
                };
            }
        }

        public async Task<ApiResponse<IEnumerable<DanhMucDonVi>>> GetByLevelAsync(int level)
        {
            try
            {
                var list = _donViRepo.GetQueryable().Where(x => x.Level == level).ToList();
                return new ApiResponse<IEnumerable<DanhMucDonVi>>
                {
                    Success = true,
                    Data = list
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<DanhMucDonVi>>
                {
                    Success = false,
                    Message = "Lỗi khi lấy danh mục đơn vị theo level: " + ex.Message
                };
            }
        }
    }
}
