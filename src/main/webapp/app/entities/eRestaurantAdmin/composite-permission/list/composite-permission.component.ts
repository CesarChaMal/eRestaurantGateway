import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompositePermission } from '../composite-permission.model';
import { CompositePermissionService } from '../service/composite-permission.service';
import { CompositePermissionDeleteDialogComponent } from '../delete/composite-permission-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-composite-permission',
  templateUrl: './composite-permission.component.html',
})
export class CompositePermissionComponent implements OnInit {
  compositePermissions?: ICompositePermission[];
  isLoading = false;

  constructor(
    protected compositePermissionService: CompositePermissionService,
    protected dataUtils: DataUtils,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.isLoading = true;

    this.compositePermissionService.query().subscribe({
      next: (res: HttpResponse<ICompositePermission[]>) => {
        this.isLoading = false;
        this.compositePermissions = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICompositePermission): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(compositePermission: ICompositePermission): void {
    const modalRef = this.modalService.open(CompositePermissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.compositePermission = compositePermission;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
