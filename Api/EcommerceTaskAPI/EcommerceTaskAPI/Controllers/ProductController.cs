using EcommerceTaskAPI.Models;
using EcommerceTaskDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using EcommerceTaskAPI.Models.BL;
namespace EcommerceTaskAPI.Controllers
{
    public class ProductController : ApiController
    {
        // POST api/product
        [Route("api/product")]
        [HttpPost]
        [Authorize]
        public IHttpActionResult InsertProduct([FromBody]ProductsModel product)
        {
            if (product.Name != "")
            {
                try
                {
                    if(ProductBL.Insert(product))
                    {
                        return Ok("Successed");

                    }
                    else
                    {
                        return BadRequest();
                    }

                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }
        [Route("api/product")]
        [HttpPut]
        [Authorize]
        public IHttpActionResult UpdateProduct([FromBody]ProductsModel product)
        {
            if (product.Name != "")
            {
                if(ProductBL.update(product))
                {
                    return Ok("Successed");
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }
        [Route("api/product/{id}")]
        [HttpDelete]
        [Authorize]
        public IHttpActionResult DeleteProduct(int id)
        {
            if (id != 0)
            {
                try
                {
                    if (ProductBL.delete(id))
                    {
                        return Ok("Successed");
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }
        [Route("api/product")]
        [HttpGet]
        // [Authorize]
        public IHttpActionResult GetProduct([FromBody]ProductsModel product)
        {
            if (product.ID != 0)
            {
                try
                {
                    var pm = ProductBL.GetProduct(product);
                    if (pm != null)
                        return Ok(pm);
                    else
                        return BadRequest();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }

        }
        [Route("api/productall/{id}")]
        [HttpGet]
        // [Authorize]
        public IHttpActionResult GetAllProduct(string id, [FromUri]PagingParameterModel pagingparametermodel)
        {

            try
            {

                List<ProductsModel> prodlist = ProductBL.GetAllProduct(id);
               
                int count = prodlist.Count();

                // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
                int CurrentPage = pagingparametermodel.pageNumber;

                // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
                int PageSize = pagingparametermodel.pageSize;

                // Display TotalCount to Records to User  
                int TotalCount = count;

                // Calculating Totalpage by Dividing (No of Records / Pagesize)  
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

                // Returns List of Customer after applying Paging   
                var items = prodlist.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

                // if CurrentPage is greater than 1 means it has previousPage  
                var previousPage = CurrentPage > 1 ? "Yes" : "No";

                // if TotalPages is greater than CurrentPage means it has nextPage  
                var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

                // Object which we are going to send in header   
                var paginationMetadata = new
                {
                    totalCount = TotalCount,
                    pageSize = PageSize,
                    currentPage = CurrentPage,
                    totalPages = TotalPages,
                    previousPage,
                    nextPage
                };

                // Setting Header  
                HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
                return Ok(items);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }





        [Route("api/productall/")]
        [HttpGet]

        public IHttpActionResult GetAllProduct([FromUri]PagingParameterModel pagingparametermodel)
        {

            try
            {

                List<ProductsModel> prodlist = ProductBL.GetAllProduct();
                
                int count = prodlist.Count();

                // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
                int CurrentPage = pagingparametermodel.pageNumber;

                // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
                int PageSize = pagingparametermodel.pageSize;

                // Display TotalCount to Records to User  
                int TotalCount = count;

                // Calculating Totalpage by Dividing (No of Records / Pagesize)  
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

                // Returns List of Customer after applying Paging   
                var items = prodlist.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

                // if CurrentPage is greater than 1 means it has previousPage  
                var previousPage = CurrentPage > 1 ? "Yes" : "No";

                // if TotalPages is greater than CurrentPage means it has nextPage  
                var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

                // Object which we are going to send in header   
                var paginationMetadata = new
                {
                    totalCount = TotalCount,
                    pageSize = PageSize,
                    currentPage = CurrentPage,
                    totalPages = TotalPages,
                    previousPage,
                    nextPage
                };

                // Setting Header  
                HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
                return Ok(items);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("api/productallcat/{catid}")]

        public IHttpActionResult GetAllProduct(int catid, [FromUri]PagingParameterModel pagingparametermodel)
        {

            try
            {
                List<ProductsModel> prodlist = ProductBL.GetAllProduct(catid);
                int count = prodlist.Count();

                // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
                int CurrentPage = pagingparametermodel.pageNumber;

                // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
                int PageSize = pagingparametermodel.pageSize;

                // Display TotalCount to Records to User  
                int TotalCount = count;

                // Calculating Totalpage by Dividing (No of Records / Pagesize)  
                int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

                // Returns List of Customer after applying Paging   
                var items = prodlist.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

                // if CurrentPage is greater than 1 means it has previousPage  
                var previousPage = CurrentPage > 1 ? "Yes" : "No";

                // if TotalPages is greater than CurrentPage means it has nextPage  
                var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

                // Object which we are going to send in header   
                var paginationMetadata = new
                {
                    totalCount = TotalCount,
                    pageSize = PageSize,
                    currentPage = CurrentPage,
                    totalPages = TotalPages,
                    previousPage,
                    nextPage
                };

                // Setting Header  
                HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
                return Ok(items);
                //return Ok(prodlist);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("api/GetAllProductbyID/{prodid}")]

        public IHttpActionResult GetAllProductbyID(int prodid)
        {

            try
            {
                var productlist = ProductBL.GetAllProductbyID(prodid);

                return Ok(productlist);

            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
        [Route("api/GetUser/{id}")]

        public string GetUser(string id)
        {
            ApplicationDbContext context = new ApplicationDbContext();
            var usr = context.Users.Where(us => us.Id == id).FirstOrDefault();
            string usrname = usr.FirstName + ' ' + usr.LastName;
            return usrname;
        }
    }
}
