import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOnHold } from '../on-hold.model';
import { OnHoldService } from '../service/on-hold.service';
import { OnHoldDeleteDialogComponent } from '../delete/on-hold-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-on-hold',
  templateUrl: './on-hold.component.html',
})
export class OnHoldComponent implements OnInit {
  onHolds?: IOnHold[];
  isLoading = false;

  constructor(protected onHoldService: OnHoldService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.onHoldService.query().subscribe({
      next: (res: HttpResponse<IOnHold[]>) => {
        this.isLoading = false;
        this.onHolds = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IOnHold): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(onHold: IOnHold): void {
    const modalRef = this.modalService.open(OnHoldDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.onHold = onHold;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
