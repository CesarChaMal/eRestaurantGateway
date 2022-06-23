import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICompositePermission, CompositePermission } from '../composite-permission.model';

import { CompositePermissionService } from './composite-permission.service';

describe('CompositePermission Service', () => {
  let service: CompositePermissionService;
  let httpMock: HttpTestingController;
  let elemDefault: ICompositePermission;
  let expectedResult: ICompositePermission | ICompositePermission[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompositePermissionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      description: 'AAAAAAA',
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

    it('should create a CompositePermission', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CompositePermission()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CompositePermission', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CompositePermission', () => {
      const patchObject = Object.assign({}, new CompositePermission());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CompositePermission', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          description: 'BBBBBB',
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

    it('should delete a CompositePermission', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCompositePermissionToCollectionIfMissing', () => {
      it('should add a CompositePermission to an empty array', () => {
        const compositePermission: ICompositePermission = { id: 'ABC' };
        expectedResult = service.addCompositePermissionToCollectionIfMissing([], compositePermission);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compositePermission);
      });

      it('should not add a CompositePermission to an array that contains it', () => {
        const compositePermission: ICompositePermission = { id: 'ABC' };
        const compositePermissionCollection: ICompositePermission[] = [
          {
            ...compositePermission,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addCompositePermissionToCollectionIfMissing(compositePermissionCollection, compositePermission);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CompositePermission to an array that doesn't contain it", () => {
        const compositePermission: ICompositePermission = { id: 'ABC' };
        const compositePermissionCollection: ICompositePermission[] = [{ id: 'CBA' }];
        expectedResult = service.addCompositePermissionToCollectionIfMissing(compositePermissionCollection, compositePermission);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compositePermission);
      });

      it('should add only unique CompositePermission to an array', () => {
        const compositePermissionArray: ICompositePermission[] = [
          { id: 'ABC' },
          { id: 'CBA' },
          { id: '3a2edbf5-b147-41e7-9ec1-338c93cd8032' },
        ];
        const compositePermissionCollection: ICompositePermission[] = [{ id: 'ABC' }];
        expectedResult = service.addCompositePermissionToCollectionIfMissing(compositePermissionCollection, ...compositePermissionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const compositePermission: ICompositePermission = { id: 'ABC' };
        const compositePermission2: ICompositePermission = { id: 'CBA' };
        expectedResult = service.addCompositePermissionToCollectionIfMissing([], compositePermission, compositePermission2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(compositePermission);
        expect(expectedResult).toContain(compositePermission2);
      });

      it('should accept null and undefined values', () => {
        const compositePermission: ICompositePermission = { id: 'ABC' };
        expectedResult = service.addCompositePermissionToCollectionIfMissing([], null, compositePermission, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(compositePermission);
      });

      it('should return initial array if no CompositePermission is added', () => {
        const compositePermissionCollection: ICompositePermission[] = [{ id: 'ABC' }];
        expectedResult = service.addCompositePermissionToCollectionIfMissing(compositePermissionCollection, undefined, null);
        expect(expectedResult).toEqual(compositePermissionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
