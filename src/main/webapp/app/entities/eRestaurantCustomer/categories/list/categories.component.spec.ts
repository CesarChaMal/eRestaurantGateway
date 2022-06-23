import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CategoriesService } from '../service/categories.service';

import { CategoriesComponent } from './categories.component';

describe('Categories Management Component', () => {
  let comp: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CategoriesComponent],
    })
      .overrideTemplate(CategoriesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CategoriesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.categories?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
