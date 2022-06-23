import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AppAdService } from '../service/app-ad.service';
import { IAppAd, AppAd } from '../app-ad.model';

import { AppAdUpdateComponent } from './app-ad-update.component';

describe('AppAd Management Update Component', () => {
  let comp: AppAdUpdateComponent;
  let fixture: ComponentFixture<AppAdUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let appAdService: AppAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AppAdUpdateComponent],
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
      .overrideTemplate(AppAdUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AppAdUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    appAdService = TestBed.inject(AppAdService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const appAd: IAppAd = { id: 'CBA' };

      activatedRoute.data = of({ appAd });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(appAd));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppAd>>();
      const appAd = { id: 'ABC' };
      jest.spyOn(appAdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appAd }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(appAdService.update).toHaveBeenCalledWith(appAd);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppAd>>();
      const appAd = new AppAd();
      jest.spyOn(appAdService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: appAd }));
      saveSubject.complete();

      // THEN
      expect(appAdService.create).toHaveBeenCalledWith(appAd);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<AppAd>>();
      const appAd = { id: 'ABC' };
      jest.spyOn(appAdService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ appAd });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(appAdService.update).toHaveBeenCalledWith(appAd);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
