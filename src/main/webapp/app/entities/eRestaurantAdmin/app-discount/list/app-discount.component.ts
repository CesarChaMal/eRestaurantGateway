import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAppDiscount } from '../app-discount.model';
import { AppDiscountService } from '../service/app-discount.service';
import { AppDiscountDeleteDialogComponent } from '../delete/app-discount-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-app-discount',
  templateUrl: './app-discount.component.html',
})
export class AppDiscountComponent implements OnInit {
  appDiscounts?: IAppDiscount[];
  isLoading = false;

  constructor(protected appDiscountService: AppDiscountService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.appDiscountService.query().subscribe({
      next: (res: HttpResponse<IAppDiscount[]>) => {
        this.isLoading = false;
        this.appDiscounts = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAppDiscount): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(appDiscount: IAppDiscount): void {
    const modalRef = this.modalService.open(AppDiscountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appDiscount = appDiscount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
