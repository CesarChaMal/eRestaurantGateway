import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAppAd, AppAd } from '../app-ad.model';
import { AppAdService } from '../service/app-ad.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-app-ad-update',
  templateUrl: './app-ad-update.component.html',
})
export class AppAdUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [null, [Validators.required, Validators.minLength(5)]],
    url: [null, [Validators.required, Validators.minLength(5)]],
    description: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected appAdService: AppAdService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ appAd }) => {
      this.updateForm(appAd);
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
    const appAd = this.createFromForm();
    if (appAd.id !== undefined) {
      this.subscribeToSaveResponse(this.appAdService.update(appAd));
    } else {
      this.subscribeToSaveResponse(this.appAdService.create(appAd));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppAd>>): void {
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

  protected updateForm(appAd: IAppAd): void {
    this.editForm.patchValue({
      id: appAd.id,
      url: appAd.url,
      description: appAd.description,
    });
  }

  protected createFromForm(): IAppAd {
    return {
      ...new AppAd(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}