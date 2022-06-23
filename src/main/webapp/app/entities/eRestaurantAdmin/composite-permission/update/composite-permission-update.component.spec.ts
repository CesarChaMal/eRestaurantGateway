import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CompositePermissionService } from '../service/composite-permission.service';
import { ICompositePermission, CompositePermission } from '../composite-permission.model';

import { CompositePermissionUpdateComponent } from './composite-permission-update.component';

describe('CompositePermission Management Update Component', () => {
  let comp: CompositePermissionUpdateComponent;
  let fixture: ComponentFixture<CompositePermissionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let compositePermissionService: CompositePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CompositePermissionUpdateComponent],
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
      .overrideTemplate(CompositePermissionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompositePermissionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    compositePermissionService = TestBed.inject(CompositePermissionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const compositePermission: ICompositePermission = { id: 'CBA' };

      activatedRoute.data = of({ compositePermission });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(compositePermission));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompositePermission>>();
      const compositePermission = { id: 'ABC' };
      jest.spyOn(compositePermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compositePermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compositePermission }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(compositePermissionService.update).toHaveBeenCalledWith(compositePermission);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompositePermission>>();
      const compositePermission = new CompositePermission();
      jest.spyOn(compositePermissionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compositePermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: compositePermission }));
      saveSubject.complete();

      // THEN
      expect(compositePermissionService.create).toHaveBeenCalledWith(compositePermission);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CompositePermission>>();
      const compositePermission = { id: 'ABC' };
      jest.spyOn(compositePermissionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ compositePermission });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(compositePermissionService.update).toHaveBeenCalledWith(compositePermission);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
