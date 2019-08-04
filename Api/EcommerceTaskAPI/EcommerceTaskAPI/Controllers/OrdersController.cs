using EcommerceTaskAPI.Models;
using EcommerceTaskDB;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace EcommerceTaskAPI.Controllers
{
    public class OrdersController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();

        [Route("api/orders/")]
        [HttpPost]
        [Authorize]
        public IHttpActionResult Orders([FromBody] OrderModel prdlist)
        {
            bool flag = false;
            context = new ApplicationDbContext();
            do
            {
                try
                {

                    if (prdlist != null)
                    {

                        Orders ord = new Orders();
                        string o = "";
                        ord.CustomerId = prdlist.CustomerId;
                        //ord.Customer = usr;
                        ord.DeliverDate = DateTime.Now.Date.AddDays(3);
                        ord.OrderDate = DateTime.Now.Date;
                        bool f = false;
                        var us = context.Users.FirstOrDefault(u => u.Id == ord.CustomerId);
                       
                        foreach (var item in prdlist.orderUserProduct)
                        {
                            var prd = context.products.FirstOrDefault(prds => prds.ID == item.Product_ID);
                            if (item.Quantity > prd.Quantity)
                            {
                                f = true;
                                break;
                            }
                        }
                        if (!f)
                        {

                            decimal price = 0;
                            foreach (var item in prdlist.orderUserProduct)
                            {
                                //context.Entry(item.user).State = EntityState.Detached;
                                var prds = context.products.FirstOrDefault(ds => ds.ID == item.Product_ID);
                                if (item.Quantity <= prds.Quantity)
                                {
                                    OrderUserProduct ordprd = new OrderUserProduct();
                                    //ordprd.Product = item.user;
                                    ordprd.Product_ID = item.Product_ID;
                                    ordprd.Quantity = item.Quantity;
                                    ord.orderUserProduct.Add(ordprd);
                                    price += item.Quantity * prds.Price;
                                    var prd = context.products.Where(pd => pd.ID == item.Product_ID).FirstOrDefault();
                                    prd.Quantity -= item.Quantity;

                                    o += $"Order Product :" +
                                       $"  Product ID ={prds.ID} \n" +
                                       $"  Product Name = {prds.Name} \n" +
                                       $"  Product Price = {prds.Price} \n" +
                                       $"  Product Qunatity = {item.Quantity} \n";


                                }
                                else
                                {

                                    return BadRequest("Qunatity Error");
                                }
                            }
                            ord.TotalOrderCash = price;

                            context.orders.Add(ord);

                            context.SaveChanges();
                            string o1 = $"Order ID : {ord.ID} \n " +
                            $"order Date : {ord.OrderDate} \n" +
                            $"deliver Date : {ord.DeliverDate} \n " +
                            $"TotalOrderCash : {ord.TotalOrderCash} \n " +
                            $"Customer Name : { us.UserName} \n " +
                            $"Customer Addres {"" + us.City + "," + us.Country}\n" +
                            $""+o;

                            var identityClaims = (ClaimsIdentity)User.Identity;
                            IEnumerable<Claim> claims = identityClaims.Claims;
                            AccountModel model = new AccountModel()
                            {
                                UserName = identityClaims.FindFirst("Username").Value,
                                Email = identityClaims.FindFirst("Email").Value,
                                FirstName = identityClaims.FindFirst("FirstName").Value,
                                LastName = identityClaims.FindFirst("LastName").Value,
                                LoggedOn = identityClaims.FindFirst("LoggedOn").Value,
                                ID = identityClaims.FindFirst("Id").Value

                            };
                            SendEmailNotification(model.Email, model.UserName, o1);
                            flag = true;
                            return Ok("Successed");
                        }
                        else
                        {
                            return BadRequest("Error");
                        }
                    }
                    else
                    {
                        return BadRequest("Error");
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    context = new ApplicationDbContext();

                    flag = false;

                }
            }
            while (flag == false);
            return Ok("Successed");
        }

        [Route("api/orders/")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult Orders()
        {
            try
            {
                var orders = context.orders.ToList();
                List<OrderModel> ordlist = new List<OrderModel>();
                foreach (var order in orders)
                {
                    OrderModel ord = new OrderModel
                    {
                        ID = order.ID,
                        CustomerId = order.CustomerId,
                        DeliverDate = order.DeliverDate,
                        OrderDate = order.OrderDate,
                        TotalOrderCash = order.TotalOrderCash,
                        
                    };
                    ord.orderUserProduct.AddRange(order.orderUserProduct);
                    ordlist.Add(ord);
                }
              
                return Ok(ordlist);
            }
            catch
            {
                return BadRequest();
            }
        }
        
        [HttpPost]

        public void SendEmailNotification(string Email, string UserName , string mailBody)
        {
            var toAddress = new MailAddress("menamakram94@gmail.com", "Mina Makram");
            var fromAddress = new MailAddress(Email, UserName);
             string fromPassword = "Asd014785963$";
             string subject = "Orders";
             string body = mailBody;

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
