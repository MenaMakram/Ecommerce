using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EcommerceTaskDB
{
    public class Orders
    {
        public int ID { get; set; }
        [DataType("date")]
        public DateTime OrderDate { get; set; }
        [DataType("date")]
        public DateTime DeliverDate { get; set; }
        [DataType("Money")]
        public decimal TotalOrderCash { get; set; }
        [ForeignKey("Customer")]
        public string CustomerId { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser Customer { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderUserProduct> orderUserProduct { get; set; } = new List<OrderUserProduct>();
    }
}