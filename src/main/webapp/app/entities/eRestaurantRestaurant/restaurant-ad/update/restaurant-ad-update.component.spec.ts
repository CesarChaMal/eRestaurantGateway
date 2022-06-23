import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RestaurantAdService } from '../service/restaurant-ad.service';
import { IRestaurantAd, RestaurantAd } from '../restaurant-ad.model';

import { RestaurantAdUpdateComponent } from './restaurant-ad-update.component';

describe('RestaurantAd Management Update Component', () => {
  let comp: RestaurantAdUpdateComponent;
  let fixture: ComponentFixture<RestaurantAdUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let restaurantAdService: RestaurantAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RestaurantAdUpdateComponent],
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
      .overrideTemplate(RestaurantAdUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantAdUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    restaurantAdService = TestBed.inject(RestaurantAdService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const restaurantAd: IRestaurantAd = { id: 'CBA' };

      activatedRoute.data = of({ restaurantAd });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(restaurantAd));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantAd>>();
      const restaurantAd = { id: 'ABC' };
      jest.spyOn(restaurantAdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantAd }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(restaurantAdService.update).toHaveBeenCalledWith(restaurantAd);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantAd>>();
      const restaurantAd = new RestaurantAd();
      jest.spyOn(restaurantAdService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantAd }));
      saveSubject.complete();

      // THEN
      expect(restaurantAdService.create).toHaveBeenCalledWith(restaurantAd);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantAd>>();
      const restaurantAd = { id: 'ABC' };
      jest.spyOn(restaurantAdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(restaurantAdService.update).toHaveBeenCalledWith(restaurantAd);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
