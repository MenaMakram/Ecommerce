using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;


namespace EcommerceTaskDB
{
   
        public class ApplicationUser : IdentityUser
        {
            public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
            {
                // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
                var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
                // Add custom user claims here
                return userIdentity;
            }
            public virtual ICollection<Product> Products { get; set; } = new List<Product>();
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Country { get; set; }
            public string City { get; set; }

    }
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
        {
            public ApplicationDbContext()
                : base("DefaultConnection", throwIfV1Schema: false)
            {
            }
            protected override void OnModelCreating(DbModelBuilder modelBuilder)
            {
            modelBuilder.Entity<SubCategory>()
               .HasRequired(t => t.Category)
               .WithMany(t => t.subCategory)
               .HasForeignKey(d => d.CategoryID)
               .WillCascadeOnDelete(true);
            modelBuilder.Entity<Product>()
              .HasRequired(t => t.subCategory)
              .WithMany(t => t.Products)
              .HasForeignKey(d => d.subCategoryID)
              .WillCascadeOnDelete(true);
            modelBuilder.Entity<OrderUserProduct>()
             .HasRequired(t => t.Product)
             .WithMany(t => t.orderUserProduct)
             .HasForeignKey(d => d.Product_ID)
             .WillCascadeOnDelete(true);
            modelBuilder.Entity<OrderUserProduct>()
            .HasRequired(t => t.order)
            .WithMany(t => t.orderUserProduct)
            .HasForeignKey(d => d.ordeID)
            .WillCascadeOnDelete(true);
            modelBuilder.Entity<Product>()
            .HasRequired(t => t.Supplier)
            .WithMany(t => t.Products)
            .HasForeignKey(d => d.SupplierID)
            .WillCascadeOnDelete(true);
            base.OnModelCreating(modelBuilder);
                //AspNetUsers -> User
                modelBuilder.Entity<ApplicationUser>()
                    .ToTable("User");
                //AspNetRoles -> Role
                modelBuilder.Entity<IdentityRole>()
                    .ToTable("Role");
                //AspNetUserRoles -> UserRole
                modelBuilder.Entity<IdentityUserRole>()
                    .ToTable("UserRole");
                //AspNetUserClaims -> UserClaim
                modelBuilder.Entity<IdentityUserClaim>()
                    .ToTable("UserClaim");
                //AspNetUserLogins -> UserLogin
                modelBuilder.Entity<IdentityUserLogin>()
                    .ToTable("UserLogin");
            modelBuilder.Entity<ApplicationUser>()
            .HasMany<Product>(s => s.Products);
           
            
        }
            public static ApplicationDbContext Create()
            {
                return new ApplicationDbContext();
            }
            public virtual DbSet<Category> category { get; set; }

            public virtual DbSet<Product> products { get; set; }
            public virtual DbSet<Orders> orders { get; set; }
            public virtual DbSet<OrderUserProduct> orderuserproduct { get; set; }
            public virtual DbSet<SubCategory> subCategories { get; set; }

    }
    }