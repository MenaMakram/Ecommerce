using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EcommerceTaskDB
{
    public class Product
    {
        public int ID { get; set; }
        public String Name { get; set; }
        public String Image { get; set; }
        public decimal Price { get; set; }
        [ConcurrencyCheck]
        public int Quantity { get; set; }
        [ForeignKey("subCategory")]
        public int? subCategoryID { get; set; }
        [JsonIgnore]
        public virtual SubCategory subCategory { get; set; }
        [ForeignKey("Supplier")]
        public string SupplierID { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser Supplier { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderUserProduct> orderUserProduct { get; set; } = new List<OrderUserProduct>();

    }
}