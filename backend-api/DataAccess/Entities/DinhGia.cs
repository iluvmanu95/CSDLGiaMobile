using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("DinhGias")]
    public class DinhGia
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("MaNghe")]
        public string? MaNghe { get; set; }

        [Column("MaHoSo")]
        public string? MaHoSo { get; set; }

        [Column("SoQd")]
        public string? SoQd { get; set; }

        [Column("MoTa")]
        public string? MoTa { get; set; }

        [Column("CongBo")]
        public string? CongBo { get; set; }

        [Column("GhiChu")]
        public string? GhiChu { get; set; }

        [Column("ThoiDiem")]
        public DateTime ThoiDiem { get; set; }

        [Column("LyDo")]
        public string? LyDo { get; set; }

        [Column("ThongTin")]
        public string? ThongTin { get; set; }

        [Column("TrangThai")]
        public string? TrangThai { get; set; }

        [Column("NgayCongBo")]
        public DateTime NgayCongBo { get; set; }

        [Column("NgayDuyet")]
        public DateTime NgayDuyet { get; set; }

        [Column("ChiTietExcel")]
        public string? ChiTietExcel { get; set; }

        [Column("CreatedBy")]
        public Guid CreatedBy { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }

        [Column("UpdatedBy")]
        public Guid UpdatedBy { get; set; }

        [Column("UpdatedDate")]
        public DateTime UpdatedDate { get; set; }

        [Column("DonViQuanLyId")]
        public Guid DonViQuanLyId { get; set; }
    }
}
