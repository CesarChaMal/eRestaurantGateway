import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompositePermission } from '../composite-permission.model';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-composite-permission-detail',
  templateUrl: './composite-permission-detail.component.html',
})
export class CompositePermissionDetailComponent implements OnInit {
  compositePermission: ICompositePermission | null = null;

  constructor(protected dataUtils: DataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compositePermission }) => {
      this.compositePermission = compositePermission;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
