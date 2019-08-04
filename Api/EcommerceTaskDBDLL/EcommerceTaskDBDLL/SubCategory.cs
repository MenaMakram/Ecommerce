using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EcommerceTaskDB
{
    public class SubCategory
    {
        public int ID { get; set; }
        public string Name { get; set; }
        [ForeignKey("Category")]
        public int? CategoryID { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    }
}