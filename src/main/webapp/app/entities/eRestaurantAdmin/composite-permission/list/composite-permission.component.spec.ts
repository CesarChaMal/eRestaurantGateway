import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CompositePermissionService } from '../service/composite-permission.service';

import { CompositePermissionComponent } from './composite-permission.component';

describe('CompositePermission Management Component', () => {
  let comp: CompositePermissionComponent;
  let fixture: ComponentFixture<CompositePermissionComponent>;
  let service: CompositePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CompositePermissionComponent],
    })
      .overrideTemplate(CompositePermissionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CompositePermissionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CompositePermissionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.compositePermissions?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });
});
