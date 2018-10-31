import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReceita } from 'app/shared/model/receita.model';
import { ReceitaService } from './receita.service';
import { IConsulta } from 'app/shared/model/consulta.model';
import { ConsultaService } from 'app/entities/consulta';

@Component({
    selector: 'jhi-receita-update',
    templateUrl: './receita-update.component.html'
})
export class ReceitaUpdateComponent implements OnInit {
    receita: IReceita;
    isSaving: boolean;

    consultas: IConsulta[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private receitaService: ReceitaService,
        private consultaService: ConsultaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receita }) => {
            this.receita = receita;
        });
        this.consultaService.query().subscribe(
            (res: HttpResponse<IConsulta[]>) => {
                this.consultas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.receita.id !== undefined) {
            this.subscribeToSaveResponse(this.receitaService.update(this.receita));
        } else {
            this.subscribeToSaveResponse(this.receitaService.create(this.receita));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceita>>) {
        result.subscribe((res: HttpResponse<IReceita>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackConsultaById(index: number, item: IConsulta) {
        return item.id;
    }
}
