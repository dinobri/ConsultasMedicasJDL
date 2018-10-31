import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRemedio } from 'app/shared/model/remedio.model';
import { RemedioService } from './remedio.service';

@Component({
    selector: 'jhi-remedio-update',
    templateUrl: './remedio-update.component.html'
})
export class RemedioUpdateComponent implements OnInit {
    remedio: IRemedio;
    isSaving: boolean;

    constructor(private remedioService: RemedioService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ remedio }) => {
            this.remedio = remedio;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.remedio.id !== undefined) {
            this.subscribeToSaveResponse(this.remedioService.update(this.remedio));
        } else {
            this.subscribeToSaveResponse(this.remedioService.create(this.remedio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRemedio>>) {
        result.subscribe((res: HttpResponse<IRemedio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
