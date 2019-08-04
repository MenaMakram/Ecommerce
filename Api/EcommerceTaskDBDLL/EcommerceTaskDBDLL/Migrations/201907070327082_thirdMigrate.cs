namespace EcommerceTaskDBDLL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class thirdMigrate : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SubCategories", "CategoryID", "dbo.Categories");
            DropForeignKey("dbo.Products", "subCategoryID", "dbo.SubCategories");
            DropForeignKey("dbo.Products", "SupplierID", "dbo.User");
            DropIndex("dbo.SubCategories", new[] { "CategoryID" });
            DropIndex("dbo.Products", new[] { "subCategoryID" });
            DropIndex("dbo.Products", new[] { "SupplierID" });
            AlterColumn("dbo.SubCategories", "CategoryID", c => c.Int(nullable: false));
            AlterColumn("dbo.Products", "subCategoryID", c => c.Int(nullable: false));
            AlterColumn("dbo.Products", "SupplierID", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.SubCategories", "CategoryID");
            CreateIndex("dbo.Products", "subCategoryID");
            CreateIndex("dbo.Products", "SupplierID");
            AddForeignKey("dbo.SubCategories", "CategoryID", "dbo.Categories", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Products", "subCategoryID", "dbo.SubCategories", "ID", cascadeDelete: true);
            AddForeignKey("dbo.Products", "SupplierID", "dbo.User", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "SupplierID", "dbo.User");
            DropForeignKey("dbo.Products", "subCategoryID", "dbo.SubCategories");
            DropForeignKey("dbo.SubCategories", "CategoryID", "dbo.Categories");
            DropIndex("dbo.Products", new[] { "SupplierID" });
            DropIndex("dbo.Products", new[] { "subCategoryID" });
            DropIndex("dbo.SubCategories", new[] { "CategoryID" });
            AlterColumn("dbo.Products", "SupplierID", c => c.String(maxLength: 128));
            AlterColumn("dbo.Products", "subCategoryID", c => c.Int());
            AlterColumn("dbo.SubCategories", "CategoryID", c => c.Int());
            CreateIndex("dbo.Products", "SupplierID");
            CreateIndex("dbo.Products", "subCategoryID");
            CreateIndex("dbo.SubCategories", "CategoryID");
            AddForeignKey("dbo.Products", "SupplierID", "dbo.User", "Id");
            AddForeignKey("dbo.Products", "subCategoryID", "dbo.SubCategories", "ID");
            AddForeignKey("dbo.SubCategories", "CategoryID", "dbo.Categories", "ID");
        }
    }
}
