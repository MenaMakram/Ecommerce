using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EcommerceTaskDBDLL;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using EcommerceTaskDB;
using System.Security.Claims;
using EcommerceTaskAPI.Models;

namespace EcommerceTaskAPI.Controllers
{
    public class AccountController : ApiController
    {
        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        public IdentityResult Register(AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email , FirstName=model.FirstName,LastName=model.LastName,Country=model.Country,City=model.City,PhoneNumber=model.PhoneNumber };
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            IdentityResult result = manager.Create(user, model.Password);
            manager.AddToRoles(user.Id, model.Roles);
            return result;
        }
        [Authorize]
        [HttpGet]
        [Route("api/GetUserClaims")]
        public AccountModel GetUserClaims()
        {
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
            return model;
        }
        [Route("api/GetAllCustomers")]
        [HttpGet]
        public IHttpActionResult GetAllCustomers()
        {

            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                var customers = context.Users.Where(us=>us.Roles.FirstOrDefault(u=>u.RoleId=="3").RoleId=="3").ToList();
                List<AccountModel> acc = new List<AccountModel>();
                foreach (var item in customers)
                {
                    AccountModel account = new AccountModel
                    {
                        ID = item.Id,
                        UserName = item.UserName
                    };
                    acc.Add(account);
                }
                return Ok(acc);
            }
            catch (Exception)
            {
                return BadRequest();
            }


        }
        [Route("api/user/{id}")]
        [HttpDelete]
        [Authorize]
        public IHttpActionResult DeleteProduct(string id)
        {
            if (id != ""||id!=null)
            {
                try
                {
                    ApplicationDbContext context = new ApplicationDbContext();
                    var customer = context.Users.FirstOrDefault(us => us.Id == id);
                    if (customer != null)
                    {
                        context.Users.Remove(customer);
                        context.SaveChanges();
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

    }
}
