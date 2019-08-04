import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

constructor(private http : HttpClient) { }
postFile(fileToUpload: File) {
  const endpoint = environment.API_URL +'UploadImage';
  const formData: FormData = new FormData();
  formData.append('Image', fileToUpload, fileToUpload.name);
  return this.http
    .post(endpoint, formData);
}
}
