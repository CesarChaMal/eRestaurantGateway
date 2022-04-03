import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IRestaurantUser, RestaurantUser } from '../restaurant-user.model';
import { RestaurantUserService } from '../service/restaurant-user.service';

import { RestaurantUserRoutingResolveService } from './restaurant-user-routing-resolve.service';

describe('RestaurantUser routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: RestaurantUserRoutingResolveService;
  let service: RestaurantUserService;
  let resultRestaurantUser: IRestaurantUser | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(RestaurantUserRoutingResolveService);
    service = TestBed.inject(RestaurantUserService);
    resultRestaurantUser = undefined;
  });

  describe('resolve', () => {
    it('should return IRestaurantUser returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRestaurantUser = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultRestaurantUser).toEqual({ id: 'ABC' });
    });

    it('should return new IRestaurantUser if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRestaurantUser = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultRestaurantUser).toEqual(new RestaurantUser());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as RestaurantUser })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultRestaurantUser = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultRestaurantUser).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
