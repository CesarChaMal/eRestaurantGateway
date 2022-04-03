import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RestaurantUserDetailComponent } from './restaurant-user-detail.component';

describe('RestaurantUser Management Detail Component', () => {
  let comp: RestaurantUserDetailComponent;
  let fixture: ComponentFixture<RestaurantUserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantUserDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ restaurantUser: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(RestaurantUserDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RestaurantUserDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load restaurantUser on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.restaurantUser).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
