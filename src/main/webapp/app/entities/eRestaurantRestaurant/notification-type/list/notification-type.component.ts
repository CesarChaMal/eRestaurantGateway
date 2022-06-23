import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotificationType } from '../notification-type.model';
import { NotificationTypeService } from '../service/notification-type.service';
import { NotificationTypeDeleteDialogComponent } from '../delete/notification-type-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-notification-type',
  templateUrl: './notification-type.component.html',
})
export class NotificationTypeComponent implements OnInit {
  notificationTypes?: INotificationType[];
  isLoading = false;

  constructor(
    protected notificationTypeService: NotificationTypeService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.notificationTypeService.query().subscribe({
      next: (res: HttpResponse<INotificationType[]>) => {
        this.isLoading = false;
        this.notificationTypes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: INotificationType): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(notificationType: INotificationType): void {
    const modalRef = this.modalService.open(NotificationTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notificationType = notificationType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
