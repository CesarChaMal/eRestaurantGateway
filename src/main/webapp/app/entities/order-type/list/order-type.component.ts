import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrderType } from '../order-type.model';
import { OrderTypeService } from '../service/order-type.service';
import { OrderTypeDeleteDialogComponent } from '../delete/order-type-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-order-type',
  templateUrl: './order-type.component.html',
})
export class OrderTypeComponent implements OnInit {
  orderTypes?: IOrderType[];
  isLoading = false;
  currentSearch: string;

  constructor(
    protected orderTypeService: OrderTypeService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }

  loadAll(): void {
    this.isLoading = true;
    if (this.currentSearch) {
      this.orderTypeService
        .search({
          query: this.currentSearch,
        })
        .subscribe({
          next: (res: HttpResponse<IOrderType[]>) => {
            this.isLoading = false;
            this.orderTypes = res.body ?? [];
          },
          error: () => {
            this.isLoading = false;
          },
        });
      return;
    }

    this.orderTypeService.query().subscribe({
      next: (res: HttpResponse<IOrderType[]>) => {
        this.isLoading = false;
        this.orderTypes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IOrderType): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(orderType: IOrderType): void {
    const modalRef = this.modalService.open(OrderTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.orderType = orderType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
