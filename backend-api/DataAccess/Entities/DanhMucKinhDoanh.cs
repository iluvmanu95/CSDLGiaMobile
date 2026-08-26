using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("DanhMucKinhDoanhs")]
    public class DanhMucKinhDoanh
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("MaNganh")]
        public string? MaNganh { get; set; }

        [Column("MaNghe")]
        public string? MaNghe { get; set; }

        [Column("TenNghe")]
        public string? TenNghe { get; set; }

        [Column("DonViDongChuyenId")]
        public string? DonViDongChuyenId { get; set; }

        [Column("DonViQuanLyId")]
        public string? DonViQuanLyId { get; set; }

        [Column("TheoDoi")]
        public string? TheoDoi { get; set; }

        [Column("PhanLoai")]
        public string? PhanLoai { get; set; }

        [Column("LoaiGia")]
        public string? LoaiGia { get; set; }

        [Column("Report")]
        public string? Report { get; set; }

        [Column("MaHH_BTC")]
        public string? MaHhBtc { get; set; }

        [Column("Level")]
        public int Level { get; set; }

        [Column("STTSapXep")]
        public int SttsapXep { get; set; }

        [Column("STTHienThi")]
        public string? StthienThi { get; set; }

        [Column("Role")]
        public string? Role { get; set; }

        [Column("RoleGoc")]
        public string? RoleGoc { get; set; }

        [Column("CreatedBy")]
        public Guid CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [Column("UpdatedBy")]
        public Guid UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime UpdatedDate { get; set; }
    }
}
