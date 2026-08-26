using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GetDataAsp.DataAccess.Entities
{
    [Table("DanhMucDonViTinhs")]
    public class DanhMucDonViTinh
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }

        [Column("MaDonViTinh")]
        public string? MaDonViTinh { get; set; }

        [Column("TenDonViTinh")]
        public string? TenDonViTinh { get; set; }
    }
}
