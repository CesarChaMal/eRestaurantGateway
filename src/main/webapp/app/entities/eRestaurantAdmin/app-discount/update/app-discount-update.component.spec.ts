import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppDiscountService } from '../service/app-discount.service';
import { IAppDiscount, AppDiscount } from '../app-discount.model';

import { AppDiscountUpdateComponent } from './app-discount-update.component';

describe('AppDiscount Management Update Component', () => {
  let comp: AppDiscountUpdateComponent;
  let fixture: ComponentFixture<AppDiscountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appDiscountService: AppDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppDiscountUpdateComponent],
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
      .overrideTemplate(AppDiscountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppDiscountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appDiscountService = TestBed.inject(AppDiscountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appDiscount: IAppDiscount = { id: 'CBA' };

      activatedRoute.data = of({ appDiscount });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(appDiscount));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppDiscount>>();
      const appDiscount = { id: 'ABC' };
      jest.spyOn(appDiscountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appDiscount }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(appDiscountService.update).toHaveBeenCalledWith(appDiscount);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppDiscount>>();
      const appDiscount = new AppDiscount();
      jest.spyOn(appDiscountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appDiscount }));
      saveSubject.complete();

      // THEN
      expect(appDiscountService.create).toHaveBeenCalledWith(appDiscount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppDiscount>>();
      const appDiscount = { id: 'ABC' };
      jest.spyOn(appDiscountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appDiscount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appDiscountService.update).toHaveBeenCalledWith(appDiscount);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
