import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomerProfile } from '../customer-profile.model';
import { CustomerProfileService } from '../service/customer-profile.service';
import { CustomerProfileDeleteDialogComponent } from '../delete/customer-profile-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-customer-profile',
  templateUrl: './customer-profile.component.html',
})
export class CustomerProfileComponent implements OnInit {
  customerProfiles?: ICustomerProfile[];
  isLoading = false;

  constructor(protected customerProfileService: CustomerProfileService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.customerProfileService.query().subscribe({
      next: (res: HttpResponse<ICustomerProfile[]>) => {
        this.isLoading = false;
        this.customerProfiles = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: ICustomerProfile): string {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(customerProfile: ICustomerProfile): void {
    const modalRef = this.modalService.open(CustomerProfileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.customerProfile = customerProfile;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
