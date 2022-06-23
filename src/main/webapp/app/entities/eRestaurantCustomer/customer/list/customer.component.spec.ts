import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CustomerService } from '../service/customer.service';

import { CustomerComponent } from './customer.component';

describe('Customer Management Component', () => {
  let comp: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CustomerComponent],
    })
      .overrideTemplate(CustomerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CustomerService);

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
    expect(comp.customers?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
