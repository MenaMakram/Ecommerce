import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Services/Product';
import { Category } from 'src/app/Services/Category';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import { ProductService } from 'src/app/Services/Product.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Shared/user.service';
import { CategoryService } from 'src/app/Services/Category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/Services/SubCategory';
import { SubCategoryService } from 'src/app/Services/SubCategory.service';

@Component({
  selector: 'app-Products',
  templateUrl: './Products.component.html',
  styleUrls: ['./Products.component.css']
})
export class ProductsComponent implements OnInit {

  prod: Product = new Product();
  catList: Category[];
  categoeryID: number;
  subcatList: SubCategory[];
  subid: number;
  userClaims: any;
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;

  // tslint:disable-next-line:max-line-length
  constructor(private imageService: ImageUploadService,
              protected productservice: ProductService,
              private userService: UserService,
              protected subcatservice: SubCategoryService,
              protected categoryService: CategoryService,
              private toastr: ToastrService,
              router: ActivatedRoute) {
    router.queryParams.subscribe(params => {
      this.prod.ID = params['ID'];
      this.prod.Name = params['Name'];
      this.prod.Image = params['Image'];
      this.prod.Price = params['Price'];
      this.prod.Quantity = params['Quantity'];
      this.categoeryID=params['CategoryID'];
      this.subid = params['SubCategoryID'];
      console.log("s"+this.subid);
      this.onchange(this.categoeryID);
      this.prod.SupplierID = params['SupplierID'];
    });

  }
  // Rungin()
  // {
  //   let builder = new HubConnectionBuilder();
  //   this.hubConnection = builder.withUrl('/SignalRHub/broadcastData').build();  // see startup.cs
  //   this.hubConnection.on('updatedClients', (message) => {
  //     console.log(message);
  //   });
  //   this.hubConnection.start();
  // }
  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      this.prod.SupplierID = this.userClaims.ID;
    });
    this.categoryService.getCat()
      .subscribe((data: any) => {
        if (data != null || data == "Successed") {
          this.catList = [];
          data.forEach(element => {

            this.catList.push(element);
          });
        } else {
          this.toastr.error(data.Errors[0]);
        }
      });
    // this.Rungin();
  }
  onchange(id: number)
  {
    this.subcatservice.getsubCat(id)
      .subscribe((data: any) => {
        if (data != null || data == "Successed") {
          this.subcatList = [];
          data.forEach(element => {

            this.subcatList.push(element);
          });
          console.log(""+this.subid);
          this.prod.SubCategoryID = this.subid;

        } else {
          this.toastr.error(data.Errors[0]);
        }
      });

  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.prod = {
      Name: '',
      ID: 0,
      Image: '',
      Quantity: 0,
      SupplierID: '',
      SubCategoryID: 0,
      Price: 0,
      SupplierName : '',
      CategoryID: 0
    }
  }
  OnSubmit(form: NgForm, Image) {
    if (this.prod.ID === 0 || this.prod.ID == null) {
      this.prod.SupplierID = this.userClaims.ID;
      //this.prod.Image = Image.name;
      this.imageService.postFile(this.fileToUpload).subscribe(
        data => {
          console.log('done');
          this.productservice.insertProd(form.value)
          .subscribe((data: any) => {
            if (data != null || data === 'Successed') {
              this.resetForm(form);
              this.toastr.success('Product Inserted successful');
              Image.value = null;
              this.imageUrl = '/assets/img/default-image.png';
            } else {
              this.toastr.error(data.Errors[0]);
            }
          });

        }
      );


    } else {
      this.imageService.postFile(this.fileToUpload).subscribe(
        data => {
          console.log('done');
          this.productservice.editProd(form.value)
          .subscribe((data: any) => {
            if (data != null || data === 'Successed') {
              this.resetForm(form);
              this.toastr.success('Product update successful');
              Image.value = null;
              this.imageUrl = '/assets/img/default-image.png';
            } else {
              this.toastr.error(data.Errors[0]);
            }
          });

        }
      );

    }
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.prod.Image = this.fileToUpload.name;

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
}
