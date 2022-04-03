import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRestaurantUser, RestaurantUser } from '../restaurant-user.model';

import { RestaurantUserService } from './restaurant-user.service';

describe('RestaurantUser Service', () => {
  let service: RestaurantUserService;
  let httpMock: HttpTestingController;
  let elemDefault: IRestaurantUser;
  let expectedResult: IRestaurantUser | IRestaurantUser[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RestaurantUserService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a RestaurantUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RestaurantUser()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RestaurantUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RestaurantUser', () => {
      const patchObject = Object.assign({}, new RestaurantUser());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RestaurantUser', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a RestaurantUser', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRestaurantUserToCollectionIfMissing', () => {
      it('should add a RestaurantUser to an empty array', () => {
        const restaurantUser: IRestaurantUser = { id: 'ABC' };
        expectedResult = service.addRestaurantUserToCollectionIfMissing([], restaurantUser);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(restaurantUser);
      });

      it('should not add a RestaurantUser to an array that contains it', () => {
        const restaurantUser: IRestaurantUser = { id: 'ABC' };
        const restaurantUserCollection: IRestaurantUser[] = [
          {
            ...restaurantUser,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addRestaurantUserToCollectionIfMissing(restaurantUserCollection, restaurantUser);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RestaurantUser to an array that doesn't contain it", () => {
        const restaurantUser: IRestaurantUser = { id: 'ABC' };
        const restaurantUserCollection: IRestaurantUser[] = [{ id: 'CBA' }];
        expectedResult = service.addRestaurantUserToCollectionIfMissing(restaurantUserCollection, restaurantUser);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(restaurantUser);
      });

      it('should add only unique RestaurantUser to an array', () => {
        const restaurantUserArray: IRestaurantUser[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: '1982bc56-daf5-4faa-9220-826c29c3e831' }];
        const restaurantUserCollection: IRestaurantUser[] = [{ id: 'ABC' }];
        expectedResult = service.addRestaurantUserToCollectionIfMissing(restaurantUserCollection, ...restaurantUserArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const restaurantUser: IRestaurantUser = { id: 'ABC' };
        const restaurantUser2: IRestaurantUser = { id: 'CBA' };
        expectedResult = service.addRestaurantUserToCollectionIfMissing([], restaurantUser, restaurantUser2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(restaurantUser);
        expect(expectedResult).toContain(restaurantUser2);
      });

      it('should accept null and undefined values', () => {
        const restaurantUser: IRestaurantUser = { id: 'ABC' };
        expectedResult = service.addRestaurantUserToCollectionIfMissing([], null, restaurantUser, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(restaurantUser);
      });

      it('should return initial array if no RestaurantUser is added', () => {
        const restaurantUserCollection: IRestaurantUser[] = [{ id: 'ABC' }];
        expectedResult = service.addRestaurantUserToCollectionIfMissing(restaurantUserCollection, undefined, null);
        expect(expectedResult).toEqual(restaurantUserCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
