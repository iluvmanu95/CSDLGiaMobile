using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("KeKhaiDangKyGias")]
    public class KeKhaiDangKyGia
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("DoanhNghiepQuanLyId")]
        public Guid DoanhNghiepQuanLyId { get; set; }

        [Column("MaHoSo")]
        public string? MaHoSo { get; set; }

        [Column("PhanLoai")]
        public string? PhanLoai { get; set; }

        [Column("MaNghe")]
        public string? MaNghe { get; set; }

        [Column("DonViQuanLyId")]
        public Guid DonViQuanLyId { get; set; }

        [Column("DonViDongChuyenId")]
        public string? DonViDongChuyenId { get; set; }

        [Column("SoQd")]
        public string? SoQd { get; set; }

        [Column("NgayQd")]
        public DateTime NgayQd { get; set; }

        [Column("SoQdLk")]
        public string? SoQdLk { get; set; }

        [Column("NgayQdLk")]
        public DateTime NgayQdLk { get; set; }

        [Column("NgayThucHien")]
        public DateTime NgayThucHien { get; set; }

        [Column("NgayTraHoSo")]
        public DateTime NgayTraHoSo { get; set; }

        [Column("ThoiGianThucHien")]
        public DateTime ThoiGianThucHien { get; set; }

        [Column("DonViTinh")]
        public string? DonViTinh { get; set; }

        [Column("GhiChu")]
        public string? GhiChu { get; set; }

        [Column("ThongTinNguoiChuyen")]
        public string? ThongTinNguoiChuyen { get; set; }

        [Column("SoDtNguoiChuyen")]
        public string? SoDtNguoiChuyen { get; set; }

        [Column("NgayChuyen")]
        public DateTime NgayChuyen { get; set; }

        [Column("TrangThai")]
        public string? TrangThai { get; set; }

        [Column("LyDo")]
        public string? LyDo { get; set; }

        [Column("SoHsDuyet")]
        public string? SoHsDuyet { get; set; }

        [Column("NgayDuyet")]
        public DateTime NgayDuyet { get; set; }

        [Column("YtCauThanhGia")]
        public string? YtCauThanhGia { get; set; }

        [Column("ThyDgGadGia")]
        public string? ThyDgGadGia { get; set; }

        [Column("ThoiDiem")]
        public DateTime ThoiDiem { get; set; }

        [Column("ChucDanhKy")]
        public string? ChucDanhKy { get; set; }

        [Column("HoTenNguoiKy")]
        public string? HoTenNguoiKy { get; set; }

        [Column("TrangThaiCSDLQG")]
        public string? TrangThaiCsdlqg { get; set; }

        [Column("NgayKetNoi")]
        public DateTime NgayKetNoi { get; set; }

        [Column("ChiTietExcel")]
        public string? ChiTietExcel { get; set; }
    }
}
