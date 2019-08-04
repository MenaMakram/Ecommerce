using EcommerceTaskAPI.Models;
using EcommerceTaskDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EcommerceTaskAPI.Controllers
{
    public class CategoryController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();
        // POST api/product
        [Route("api/Category")]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult InsertCategory([FromBody]CategoryModel category)
        {
            if (category.Name != "" && category.Name != null)
            {
                try
                {
                    Category categorys = new Category();
                    categorys.Name = category.Name;

                    context.category.Add(categorys);
                    context.SaveChanges();
                    return Ok("Successed");
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound();
            }

        }
        [Route("api/Category")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult UpdateCategory([FromBody]CategoryModel category)
        {
            if (category.Name != "" && category.Name != null)
            {
                try
                {
                    Category prod = context.category.FirstOrDefault(pd => pd.ID == category.ID);
                    prod.Name = category.Name;

                    context.SaveChanges();
                    return Ok("Successed");
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound();
            }

        }
        [Route("api/Category/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteCategory(int id)
        {
            if (id != 0)
            {
                try
                {
                    Category categorys = context.category.FirstOrDefault(pd => pd.ID == id);
                    
                    //var subCategory=
                    //var prodlist = categorys.Products.ToList();
                    //foreach (var item in prodlist)
                    //{
                    //    var orderusrprod = context.orderuserproduct.Where(pr => pr.Product_ID == item.ID).ToList();
                    //    context.orderuserproduct.RemoveRange(orderusrprod);
                    //}
                    //context.products.RemoveRange(prodlist);
                    context.category.Remove(categorys);
                    context.SaveChanges();
                    return Ok("Successed");
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound();
            }

        }
        [Route("api/Category")]
        [HttpGet]
        public IHttpActionResult GetCategory([FromBody]CategoryModel category)
        {
            if (category.ID != 0)
            {
                try
                {
                    Category prod = context.category.FirstOrDefault(pd => pd.ID == category.ID);
                    return Ok(prod);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound();
            }

        }
        [Route("api/Categoryall")]
        [HttpGet]
        public IHttpActionResult GetAllCategory()
        {

            try
            {
                var categorylist = context.category.ToList();
                return Ok(categorylist);
            }
            catch (Exception)
            {
                return BadRequest();
            }


        }
    }
}
