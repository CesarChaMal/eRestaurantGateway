import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INewOrder } from '../new-order.model';
import { NewOrderService } from '../service/new-order.service';
import { NewOrderDeleteDialogComponent } from '../delete/new-order-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-new-order',
  templateUrl: './new-order.component.html',
})
export class NewOrderComponent implements OnInit {
  newOrders?: INewOrder[];
  isLoading = false;

  constructor(protected newOrderService: NewOrderService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.newOrderService.query().subscribe({
      next: (res: HttpResponse<INewOrder[]>) => {
        this.isLoading = false;
        this.newOrders = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: INewOrder): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(newOrder: INewOrder): void {
    const modalRef = this.modalService.open(NewOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.newOrder = newOrder;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
