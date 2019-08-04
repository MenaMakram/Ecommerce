using EcommerceTaskDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskAPI.Models
{
    public class Dto_Cart
    {
        public Product product { get; set; }
        public int Quantity { get; set; }
    }
}