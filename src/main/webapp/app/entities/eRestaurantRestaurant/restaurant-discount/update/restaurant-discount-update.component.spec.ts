import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RestaurantDiscountService } from '../service/restaurant-discount.service';
import { IRestaurantDiscount, RestaurantDiscount } from '../restaurant-discount.model';

import { RestaurantDiscountUpdateComponent } from './restaurant-discount-update.component';

describe('RestaurantDiscount Management Update Component', () => {
  let comp: RestaurantDiscountUpdateComponent;
  let fixture: ComponentFixture<RestaurantDiscountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let restaurantDiscountService: RestaurantDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RestaurantDiscountUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RestaurantDiscountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantDiscountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    restaurantDiscountService = TestBed.inject(RestaurantDiscountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const restaurantDiscount: IRestaurantDiscount = { id: 'CBA' };

      activatedRoute.data = of({ restaurantDiscount });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(restaurantDiscount));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantDiscount>>();
      const restaurantDiscount = { id: 'ABC' };
      jest.spyOn(restaurantDiscountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantDiscount }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(restaurantDiscountService.update).toHaveBeenCalledWith(restaurantDiscount);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantDiscount>>();
      const restaurantDiscount = new RestaurantDiscount();
      jest.spyOn(restaurantDiscountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantDiscount }));
      saveSubject.complete();

      // THEN
      expect(restaurantDiscountService.create).toHaveBeenCalledWith(restaurantDiscount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantDiscount>>();
      const restaurantDiscount = { id: 'ABC' };
      jest.spyOn(restaurantDiscountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(restaurantDiscountService.update).toHaveBeenCalledWith(restaurantDiscount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
