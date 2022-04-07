import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RestaurantUserService } from '../service/restaurant-user.service';
import { IRestaurantUser, RestaurantUser } from '../restaurant-user.model';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

import { RestaurantUserUpdateComponent } from './restaurant-user-update.component';

describe('RestaurantUser Management Update Component', () => {
  let comp: RestaurantUserUpdateComponent;
  let fixture: ComponentFixture<RestaurantUserUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let restaurantUserService: RestaurantUserService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RestaurantUserUpdateComponent],
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
      .overrideTemplate(RestaurantUserUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RestaurantUserUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    restaurantUserService = TestBed.inject(RestaurantUserService);
    userService = TestBed.inject(UserService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call User query and add missing value', () => {
      const restaurantUser: IRestaurantUser = { id: 'CBA' };
      const internalUser: IUser = { id: '601614a4-de68-4015-8183-53e9501ca292' };
      restaurantUser.internalUser = internalUser;

      const userCollection: IUser[] = [{ id: '57e57aa1-2290-4114-b432-89c0e3917396' }];
      jest.spyOn(userService, 'query').mockReturnValue(of(new HttpResponse({ body: userCollection })));
      const additionalUsers = [internalUser];
      const expectedCollection: IUser[] = [...additionalUsers, ...userCollection];
      jest.spyOn(userService, 'addUserToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ restaurantUser });
      comp.ngOnInit();

      expect(userService.query).toHaveBeenCalled();
      expect(userService.addUserToCollectionIfMissing).toHaveBeenCalledWith(userCollection, ...additionalUsers);
      expect(comp.usersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const restaurantUser: IRestaurantUser = { id: 'CBA' };
      const internalUser: IUser = { id: 'c1628274-cb7f-46e2-81d8-55d0c24a7b9b' };
      restaurantUser.internalUser = internalUser;

      activatedRoute.data = of({ restaurantUser });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(restaurantUser));
      expect(comp.usersSharedCollection).toContain(internalUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantUser>>();
      const restaurantUser = { id: 'ABC' };
      jest.spyOn(restaurantUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantUser }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(restaurantUserService.update).toHaveBeenCalledWith(restaurantUser);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantUser>>();
      const restaurantUser = new RestaurantUser();
      jest.spyOn(restaurantUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: restaurantUser }));
      saveSubject.complete();

      // THEN
      expect(restaurantUserService.create).toHaveBeenCalledWith(restaurantUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<RestaurantUser>>();
      const restaurantUser = { id: 'ABC' };
      jest.spyOn(restaurantUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ restaurantUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(restaurantUserService.update).toHaveBeenCalledWith(restaurantUser);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackUserById', () => {
      it('Should return tracked User primary key', () => {
        const entity = { id: 'ABC' };
        const trackResult = comp.trackUserById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
