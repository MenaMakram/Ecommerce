using EcommerceTaskDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskAPI.Models
{
    public class OrderModel
    {
        public int ID { get; set; }        
        public DateTime OrderDate { get; set; }
        public DateTime DeliverDate { get; set; }
        public decimal TotalOrderCash { get; set; }
        public string CustomerId { get; set; }
        public List<OrderUserProduct> orderUserProduct { get; set; } = new List<OrderUserProduct>();
    }
}