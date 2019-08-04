using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskAPI.Models
{
    public class subCategoryModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int CategoryID { get; set; }
    }
}