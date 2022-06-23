import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRestaurantAd } from '../restaurant-ad.model';
import { RestaurantAdService } from '../service/restaurant-ad.service';
import { RestaurantAdDeleteDialogComponent } from '../delete/restaurant-ad-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-restaurant-ad',
  templateUrl: './restaurant-ad.component.html',
})
export class RestaurantAdComponent implements OnInit {
  restaurantAds?: IRestaurantAd[];
  isLoading = false;

  constructor(protected restaurantAdService: RestaurantAdService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.restaurantAdService.query().subscribe({
      next: (res: HttpResponse<IRestaurantAd[]>) => {
        this.isLoading = false;
        this.restaurantAds = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IRestaurantAd): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(restaurantAd: IRestaurantAd): void {
    const modalRef = this.modalService.open(RestaurantAdDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.restaurantAd = restaurantAd;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
