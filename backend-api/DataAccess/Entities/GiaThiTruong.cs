using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("GiaThiTruongs")]
    public class GiaThiTruong
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("MaHoSo")]
        public string? MaHoSo { get; set; }

        [Column("DiaBanId")]
        public Guid DiaBanId { get; set; }

        [Column("DonViQuanLyId")]
        public Guid DonViQuanLyId { get; set; }

        [Column("DonViChuQuanId")]
        public Guid DonViChuQuanId { get; set; }

        [Column("ThongTuId")]
        public Guid ThongTuId { get; set; }

        [Column("SoQd")]
        public string? SoQd { get; set; }

        [Column("Thoidiem")]
        public DateTime Thoidiem { get; set; }

        [Column("SoQdLk")]
        public string? SoQdLk { get; set; }

        [Column("ThoiDiemLk")]
        public DateTime ThoiDiemLk { get; set; }

        [Column("Thang")]
        public string? Thang { get; set; }

        [Column("Nam")]
        public string? Nam { get; set; }

        [Column("CongBo")]
        public string? CongBo { get; set; }

        [Column("LichSu")]
        public string? LichSu { get; set; }

        [Column("GhiChu")]
        public string? GhiChu { get; set; }

        [Column("LyDo")]
        public string? LyDo { get; set; }

        [Column("TrangThai")]
        public string? TrangThai { get; set; }

        [Column("PhanLoaiHoSo")]
        public string? PhanLoaiHoSo { get; set; }

        [Column("ChiTietExcel")]
        public string? ChiTietExcel { get; set; }

        [Column("TrangThaiCSDLQG")]
        public string? TrangThaiCsdlqg { get; set; }

        [Column("NgayKetNoi")]
        public DateTime NgayKetNoi { get; set; }

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
