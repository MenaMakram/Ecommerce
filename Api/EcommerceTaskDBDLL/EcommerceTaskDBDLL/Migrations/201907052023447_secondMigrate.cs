namespace EcommerceTaskDBDLL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class secondMigrate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.User", "Country", c => c.String());
            AddColumn("dbo.User", "City", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.User", "City");
            DropColumn("dbo.User", "Country");
        }
    }
}
