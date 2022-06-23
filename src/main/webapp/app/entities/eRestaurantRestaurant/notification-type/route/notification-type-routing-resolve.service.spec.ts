import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { INotificationType, NotificationType } from '../notification-type.model';
import { NotificationTypeService } from '../service/notification-type.service';

import { NotificationTypeRoutingResolveService } from './notification-type-routing-resolve.service';

describe('NotificationType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: NotificationTypeRoutingResolveService;
  let service: NotificationTypeService;
  let resultNotificationType: INotificationType | undefined;

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
    routingResolveService = TestBed.inject(NotificationTypeRoutingResolveService);
    service = TestBed.inject(NotificationTypeService);
    resultNotificationType = undefined;
  });

  describe('resolve', () => {
    it('should return INotificationType returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNotificationType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultNotificationType).toEqual({ id: 'ABC' });
    });

    it('should return new INotificationType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNotificationType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNotificationType).toEqual(new NotificationType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NotificationType })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultNotificationType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultNotificationType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
