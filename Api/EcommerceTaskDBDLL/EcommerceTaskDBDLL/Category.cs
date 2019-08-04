using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskDB
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<SubCategory> subCategory { get; set; } = new List<SubCategory>();
    }
}