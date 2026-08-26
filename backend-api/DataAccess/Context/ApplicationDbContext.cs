using Microsoft.EntityFrameworkCore;
using GetDataAsp.DataAccess.Entities;

namespace GetDataAsp.DataAccess.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<DanhMucDonVi> DanhMucDonVis { get; set; }
        public DbSet<DanhMucKinhDoanh> DanhMucKinhDoanhs { get; set; }
        public DbSet<DanhMucDonViTinh> DanhMucDonViTinhs { get; set; }
        public DbSet<DinhGia> DinhGias { get; set; }
        public DbSet<KeKhaiDangKyGia> KeKhaiDangKyGias { get; set; }
        public DbSet<GiaThiTruong> GiaThiTruongs { get; set; }
        public DbSet<ThamDinhGia> ThamDinhGias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
