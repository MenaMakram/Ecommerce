using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskAPI.Models
{
    public class ProductsModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int SubCategoryID { get; set; }
        public string SupplierID { get; set; }
        public string SupplierName { get; set; }
        public int CategoryID { get; set; }
    }
}