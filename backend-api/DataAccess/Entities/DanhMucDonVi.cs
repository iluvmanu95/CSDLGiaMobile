using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("DanhMucDonVi")]
    public class DanhMucDonVi
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("TenDonVi")]
        public string TenDonVi { get; set; } = string.Empty;

        [Column("Level")]
        public int Level { get; set; }

        [Column("STTSapXep")]
        public int? SttsapXep { get; set; }

        [Column("DonViChuQuanId")]
        public Guid? DonViChuQuanId { get; set; }

        [Column("DiaChi")]
        public string? DiaChi { get; set; }

        [Column("MaQHNS")]
        public string? MaQhns { get; set; }

        [Column("SoDienThoai")]
        public string? SoDienThoai { get; set; }

        [Column("ChucDanhQuanLy")]
        public string? ChucDanhQuanLy { get; set; }

        [Column("HoVaTenNguoiQuanLy")]
        public string? HoVaTenNguoiQuanLy { get; set; }

        [Column("PhanLoaiDonVi")]
        public string? PhanLoaiDonVi { get; set; }

        [Column("CreatedBy")]
        public Guid? CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime? CreatedDate { get; set; }

        [Column("UpdatedBy")]
        public Guid? UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime? UpdatedDate { get; set; }

        [Column("TinhNangThanhToan")]
        public bool? TinhNangThanhToan { get; set; }
    }
}
