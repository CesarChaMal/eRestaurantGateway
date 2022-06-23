import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiscount } from '../discount.model';
import { DiscountService } from '../service/discount.service';
import { DiscountDeleteDialogComponent } from '../delete/discount-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-discount',
  templateUrl: './discount.component.html',
})
export class DiscountComponent implements OnInit {
  discounts?: IDiscount[];
  isLoading = false;

  constructor(protected discountService: DiscountService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.discountService.query().subscribe({
      next: (res: HttpResponse<IDiscount[]>) => {
        this.isLoading = false;
        this.discounts = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IDiscount): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(discount: IDiscount): void {
    const modalRef = this.modalService.open(DiscountDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.discount = discount;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
