using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("Username")]
        public string Username { get; set; } = string.Empty;

        [Column("Email")]
        public string? Email { get; set; }

        [Column("Name")]
        public string? Name { get; set; }

        [Column("Password")]
        public string? Password { get; set; }

        [Column("Ssa")]
        public bool? Ssa { get; set; }

        [Column("DanhMucDonViId")]
        public Guid? DanhMucDonViId { get; set; }

        [Column("Status")]
        public string? Status { get; set; }

        [Column("TenDonViBaoCao")]
        public string? TenDonViBaoCao { get; set; }

        [Column("TenDonViChuQuanBaoCao")]
        public string? TenDonViChuQuanBaoCao { get; set; }

        [Column("DiaDanh")]
        public string? DiaDanh { get; set; }

        [Column("ChucDanhKy")]
        public string? ChucDanhKy { get; set; }

        [Column("HoTenNguoiKy")]
        public string? HoTenNguoiKy { get; set; }

        [Column("GroupPermissionId")]
        public Guid? GroupPermissionId { get; set; }

        [Column("Level")]
        public string? Level { get; set; }

        [Column("DoanhNghiepId")]
        public Guid? DoanhNghiepId { get; set; }

        [Column("CreatedDate")]
        public DateTime? CreatedDate { get; set; }

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate { get; set; }
    }
}
