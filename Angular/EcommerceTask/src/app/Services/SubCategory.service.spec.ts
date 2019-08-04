/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubCategoryService } from './SubCategory.service';

describe('Service: SubCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubCategoryService]
    });
  });

  it('should ...', inject([SubCategoryService], (service: SubCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
