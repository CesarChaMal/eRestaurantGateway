import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICompositePermission, CompositePermission } from '../composite-permission.model';
import { CompositePermissionService } from '../service/composite-permission.service';

import { CompositePermissionRoutingResolveService } from './composite-permission-routing-resolve.service';

describe('CompositePermission routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CompositePermissionRoutingResolveService;
  let service: CompositePermissionService;
  let resultCompositePermission: ICompositePermission | undefined;

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
    routingResolveService = TestBed.inject(CompositePermissionRoutingResolveService);
    service = TestBed.inject(CompositePermissionService);
    resultCompositePermission = undefined;
  });

  describe('resolve', () => {
    it('should return ICompositePermission returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCompositePermission = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCompositePermission).toEqual({ id: 'ABC' });
    });

    it('should return new ICompositePermission if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCompositePermission = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCompositePermission).toEqual(new CompositePermission());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CompositePermission })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCompositePermission = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCompositePermission).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
