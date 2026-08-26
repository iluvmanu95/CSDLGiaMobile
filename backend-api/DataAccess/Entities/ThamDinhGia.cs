using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("ThamDinhGias")]
    public class ThamDinhGia
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("DiaBanId")]
        public Guid DiaBanId { get; set; }

        [Column("DonViQuanLyId")]
        public Guid DonViQuanLyId { get; set; }

        [Column("DonViChuQuanId")]
        public Guid DonViChuQuanId { get; set; }

        [Column("DiaDiem")]
        public string? DiaDiem { get; set; }

        [Column("DvYeuCau")]
        public string? DvYeuCau { get; set; }

        [Column("ThoiHan")]
        public DateTime ThoiHan { get; set; }

        [Column("SoTbKl")]
        public string? SoTbKl { get; set; }

        [Column("PhanLoai")]
        public string? PhanLoai { get; set; }

        [Column("SoQdPheDuyet")]
        public string? SoQdPheDuyet { get; set; }

        [Column("NgayQdPheDuyet")]
        public DateTime NgayQdPheDuyet { get; set; }

        [Column("SoNgayKq")]
        public int SoNgayKq { get; set; }

        [Column("TtTsTd")]
        public string? TtTsTd { get; set; }

        [Column("CongBo")]
        public string? CongBo { get; set; }

        [Column("GhiChu")]
        public string? GhiChu { get; set; }

        [Column("Thoidiem")]
        public DateTime Thoidiem { get; set; }

        [Column("LyDo")]
        public string? LyDo { get; set; }

        [Column("ThongTin")]
        public string? ThongTin { get; set; }

        [Column("TrangThai")]
        public string? TrangThai { get; set; }

        [Column("TrangThaiCSDLQG")]
        public string? TrangThaiCsdlqg { get; set; }

        [Column("NgayKetNoi")]
        public DateTime NgayKetNoi { get; set; }

        [Column("Ipf1")]
        public string? Ipf1 { get; set; }

        [Column("CreatedBy")]
        public Guid CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [Column("UpdatedBy")]
        public Guid UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime UpdatedDate { get; set; }

        [Column("ChiTietExcel")]
        public string? ChiTietExcel { get; set; }

        [Column("DonViThamDinhId")]
        public Guid DonViThamDinhId { get; set; }

        [Column("HoiDongId")]
        public Guid HoiDongId { get; set; }

        [Column("HangHoaId")]
        public Guid HangHoaId { get; set; }
    }
}
