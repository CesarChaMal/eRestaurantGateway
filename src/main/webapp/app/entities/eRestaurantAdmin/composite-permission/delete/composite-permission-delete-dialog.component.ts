import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompositePermission } from '../composite-permission.model';
import { CompositePermissionService } from '../service/composite-permission.service';

@Component({
  templateUrl: './composite-permission-delete-dialog.component.html',
})
export class CompositePermissionDeleteDialogComponent {
  compositePermission?: ICompositePermission;

  constructor(protected compositePermissionService: CompositePermissionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.compositePermissionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
