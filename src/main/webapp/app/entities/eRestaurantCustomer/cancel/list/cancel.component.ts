import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICancel } from '../cancel.model';
import { CancelService } from '../service/cancel.service';
import { CancelDeleteDialogComponent } from '../delete/cancel-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-cancel',
  templateUrl: './cancel.component.html',
})
export class CancelComponent implements OnInit {
  cancels?: ICancel[];
  isLoading = false;

  constructor(protected cancelService: CancelService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.cancelService.query().subscribe({
      next: (res: HttpResponse<ICancel[]>) => {
        this.isLoading = false;
        this.cancels = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICancel): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(cancel: ICancel): void {
    const modalRef = this.modalService.open(CancelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cancel = cancel;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
