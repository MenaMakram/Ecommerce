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
    public class subCategoryController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();
        // POST api/product
        [Route("api/SubCategory")]
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult InsertSubCategory([FromBody]subCategoryModel Subcategory)
        {
            if (Subcategory.Name != "" && Subcategory.Name != null)
            {
                try
                {
                    SubCategory subcategorys = new SubCategory();
                    subcategorys.Name = Subcategory.Name;
                    subcategorys.CategoryID = Subcategory.CategoryID;

                    context.subCategories.Add(subcategorys);
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
        [Route("api/SubCategory")]
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult UpdateSubCategory([FromBody]subCategoryModel Subcategory)
        {
            if (Subcategory.Name != "" && Subcategory.Name != null)
            {
                try
                {
                    var prod = context.subCategories.FirstOrDefault(pd => pd.ID == Subcategory.ID);
                    prod.Name = Subcategory.Name;
                    prod.CategoryID = Subcategory.CategoryID;
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
        [Route("api/SubCategory/{id}")]
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteSubCategory(int id)
        {
            if (id != 0)
            {
                try
                {
                    var categorys = context.subCategories.FirstOrDefault(pd => pd.ID == id);

                    //var subCategory=
                    //var prodlist = categorys.Products.ToList();
                    //foreach (var item in prodlist)
                    //{
                    //    var orderusrprod = context.orderuserproduct.Where(pr => pr.Product_ID == item.ID).ToList();
                    //    context.orderuserproduct.RemoveRange(orderusrprod);
                    //}
                    //context.products.RemoveRange(prodlist);
                    context.subCategories.Remove(categorys);
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
        [Route("api/SubCategory")]
        [HttpGet]
        public IHttpActionResult GetSubCategory([FromBody]subCategoryModel Subcategory)
        {
            if (Subcategory.ID != 0)
            {
                try
                {
                    var prod = context.subCategories.FirstOrDefault(pd => pd.ID == Subcategory.ID);
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
        [Route("api/SubCategoryall")]
        [HttpGet]
        public IHttpActionResult GetAllSubCategory()
        {

            try
            {
                var categorylist = context.subCategories.ToList();
                return Ok(categorylist);
            }
            catch (Exception)
            {
                return BadRequest();
            }


        }
        [Route("api/SubCategoryall/{id}")]
        [HttpGet]
        public IHttpActionResult GetAllSubCategory(int id)
        {

            try
            {
                var categorylist = context.subCategories.Where(ss=>ss.CategoryID==id).ToList();
                return Ok(categorylist);
            }
            catch (Exception)
            {
                return BadRequest();
            }


        }
    }
}
