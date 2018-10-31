import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IConsultorio } from 'app/shared/model/consultorio.model';
import { ConsultorioService } from './consultorio.service';

@Component({
    selector: 'jhi-consultorio-update',
    templateUrl: './consultorio-update.component.html'
})
export class ConsultorioUpdateComponent implements OnInit {
    consultorio: IConsultorio;
    isSaving: boolean;

    constructor(private consultorioService: ConsultorioService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consultorio }) => {
            this.consultorio = consultorio;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consultorio.id !== undefined) {
            this.subscribeToSaveResponse(this.consultorioService.update(this.consultorio));
        } else {
            this.subscribeToSaveResponse(this.consultorioService.create(this.consultorio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsultorio>>) {
        result.subscribe((res: HttpResponse<IConsultorio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
