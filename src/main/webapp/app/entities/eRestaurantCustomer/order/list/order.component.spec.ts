import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { OrderService } from '../service/order.service';

import { OrderComponent } from './order.component';

describe('Order Management Component', () => {
  let comp: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [OrderComponent],
    })
      .overrideTemplate(OrderComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OrderService);

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
    expect(comp.orders?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
