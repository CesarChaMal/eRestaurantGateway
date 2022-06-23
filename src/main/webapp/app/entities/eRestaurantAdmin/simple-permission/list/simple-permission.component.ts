import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISimplePermission } from '../simple-permission.model';
import { SimplePermissionService } from '../service/simple-permission.service';
import { SimplePermissionDeleteDialogComponent } from '../delete/simple-permission-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-simple-permission',
  templateUrl: './simple-permission.component.html',
})
export class SimplePermissionComponent implements OnInit {
  simplePermissions?: ISimplePermission[];
  isLoading = false;

  constructor(
    protected simplePermissionService: SimplePermissionService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.simplePermissionService.query().subscribe({
      next: (res: HttpResponse<ISimplePermission[]>) => {
        this.isLoading = false;
        this.simplePermissions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ISimplePermission): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(simplePermission: ISimplePermission): void {
    const modalRef = this.modalService.open(SimplePermissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.simplePermission = simplePermission;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
