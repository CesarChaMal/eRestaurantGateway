import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdmin } from '../admin.model';
import { AdminService } from '../service/admin.service';
import { AdminDeleteDialogComponent } from '../delete/admin-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  admins?: IAdmin[];
  isLoading = false;

  constructor(protected adminService: AdminService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.adminService.query().subscribe({
      next: (res: HttpResponse<IAdmin[]>) => {
        this.isLoading = false;
        this.admins = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IAdmin): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(admin: IAdmin): void {
    const modalRef = this.modalService.open(AdminDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.admin = admin;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
