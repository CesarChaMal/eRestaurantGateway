import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAppDiscount, AppDiscount } from '../app-discount.model';
import { AppDiscountService } from '../service/app-discount.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-app-discount-update',
  templateUrl: './app-discount-update.component.html',
})
export class AppDiscountUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [null, [Validators.required, Validators.minLength(5)]],
    code: [null, [Validators.required, Validators.minLength(3)]],
    description: [],
    percentage: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected appDiscountService: AppDiscountService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appDiscount }) => {
      this.updateForm(appDiscount);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertError>('eRestaurantGatewayApp.error', { ...err, key: 'error.file.' + err.key })
        ),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appDiscount = this.createFromForm();
    if (appDiscount.id !== undefined) {
      this.subscribeToSaveResponse(this.appDiscountService.update(appDiscount));
    } else {
      this.subscribeToSaveResponse(this.appDiscountService.create(appDiscount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppDiscount>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(appDiscount: IAppDiscount): void {
    this.editForm.patchValue({
      id: appDiscount.id,
      code: appDiscount.code,
      description: appDiscount.description,
      percentage: appDiscount.percentage,
    });
  }

  protected createFromForm(): IAppDiscount {
    return {
      ...new AppDiscount(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      description: this.editForm.get(['description'])!.value,
      percentage: this.editForm.get(['percentage'])!.value,
    };
  }
}
