using EcommerceTaskDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EcommerceTaskAPI.Models.BL
{
    public class ProductBL
    {

        public static bool Insert(ProductsModel product)
        {
            ApplicationDbContext context = new ApplicationDbContext();

            try
            {
                Product prod = new Product();
                prod.Name = product.Name;
                prod.Image = product.Image;
                prod.Price = product.Price;
                prod.Quantity = product.Quantity;
                prod.SupplierID = product.SupplierID;
                prod.subCategoryID = product.SubCategoryID;

                context.products.Add(prod);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool update(ProductsModel product)
        {
            ApplicationDbContext context = new ApplicationDbContext();

            try
            {
                Product prod = context.products.FirstOrDefault(pd => pd.ID == product.ID);
                prod.Name = product.Name;
                prod.Image = product.Image;
                prod.Price = product.Price;
                prod.Quantity = product.Quantity;
                prod.SupplierID = product.SupplierID;
                prod.subCategoryID = product.SubCategoryID;
                context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static bool delete(int id)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();

                Product prod = context.products.FirstOrDefault(pd => pd.ID == id);
                var ous = context.orderuserproduct.Where(ps => ps.Product_ID == prod.ID).ToList();
                context.orderuserproduct.RemoveRange(ous);
                context.products.Remove(prod);
                context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static ProductsModel GetProduct(ProductsModel product)
        {

            try
            {
                ApplicationDbContext context = new ApplicationDbContext();

                Product prod = context.products.FirstOrDefault(pd => pd.ID == product.ID);

                ProductsModel pm = new ProductsModel
                {
                    ID = prod.ID,
                    Name = prod.Name,
                    Image = prod.Image,
                    Price = prod.Price,
                    SubCategoryID = int.Parse(prod.subCategoryID.ToString()),
                    Quantity = prod.Quantity,
                    SupplierID = prod.SupplierID,
                    SupplierName = prod.Supplier.UserName
                    ,CategoryID=int.Parse(prod.subCategory.CategoryID.ToString())
                }
                ;

                return pm;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static List<ProductsModel> GetAllProduct(string id)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                var productlist = context.products.Where(sp => sp.SupplierID == id).ToList();
                List<ProductsModel> prodlist = new List<ProductsModel>();
                foreach (var item in productlist)
                {
                    ProductsModel pm = new ProductsModel
                    {
                        ID = item.ID,
                        Name = item.Name,
                        Image = item.Image,
                        Price = item.Price,
                        SubCategoryID = int.Parse(item.subCategoryID.ToString()),
                        Quantity = item.Quantity,
                        SupplierID = item.SupplierID,
                        SupplierName = item.Supplier.UserName
                        ,
                        CategoryID = int.Parse(item.subCategory.CategoryID.ToString())
                    }
                    ;
                    prodlist.Add(pm);
                }
                return prodlist;
            }
            catch
            {
                return null;
            }
        }
        public static ProductsModel GetAllProductbyID(int prodid)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                var productlist = context.products.Where(ps => ps.ID == prodid).FirstOrDefault();

                ProductsModel pm = new ProductsModel
                {
                    ID = productlist.ID,
                    Name = productlist.Name,
                    Image = productlist.Image,
                    Price = productlist.Price,
                    SubCategoryID = int.Parse(productlist.subCategoryID.ToString()),
                    Quantity = productlist.Quantity,
                    SupplierID = productlist.SupplierID,
                    SupplierName = productlist.Supplier.UserName
                    ,
                    CategoryID = int.Parse(productlist.subCategory.CategoryID.ToString())
                }
                ;


                return pm;

            }
            catch (Exception)
            {
                return null;
            }
        }
        public static List<ProductsModel> GetAllProduct()
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                var productlist = context.products.ToList();
                List<ProductsModel> prodlist = new List<ProductsModel>();
                foreach (var item in productlist)
                {
                    ProductsModel pm = new ProductsModel
                    {
                        ID = item.ID,
                        Name = item.Name,
                        Image = item.Image,
                        Price = item.Price,
                        SubCategoryID = int.Parse(item.subCategoryID.ToString()),
                        Quantity = item.Quantity,
                        SupplierID = item.SupplierID,
                        SupplierName = item.Supplier.UserName
                        ,
                        CategoryID = int.Parse(item.subCategory.CategoryID.ToString())
                    }
                    ;

                    prodlist.Add(pm);
                }
                
                return prodlist;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public static List<ProductsModel> GetAllProduct(int catid)
        {
            try
            {
                ApplicationDbContext context = new ApplicationDbContext();
                var productlist = context.products.Where(ps => ps.subCategoryID == catid).ToList();
                List<ProductsModel> prodlist = new List<ProductsModel>();
                foreach (var item in productlist)
                {
                    ProductsModel pm = new ProductsModel
                    {
                        ID = item.ID,
                        Name = item.Name,
                        Image = item.Image,
                        Price = item.Price,
                        SubCategoryID = int.Parse(item.subCategoryID.ToString()),
                        Quantity = item.Quantity,
                        SupplierID = item.SupplierID,
                        SupplierName = item.Supplier.UserName
                        ,
                        CategoryID = int.Parse(item.subCategory.CategoryID.ToString())
                    }
                    ;
                    prodlist.Add(pm);
                }
                return prodlist;
            }
            catch
            {
                return null;
            }
        }
    }
}