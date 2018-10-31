import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPosologia } from 'app/shared/model/posologia.model';
import { PosologiaService } from './posologia.service';
import { IRemedio } from 'app/shared/model/remedio.model';
import { RemedioService } from 'app/entities/remedio';
import { IReceita } from 'app/shared/model/receita.model';
import { ReceitaService } from 'app/entities/receita';

@Component({
    selector: 'jhi-posologia-update',
    templateUrl: './posologia-update.component.html'
})
export class PosologiaUpdateComponent implements OnInit {
    posologia: IPosologia;
    isSaving: boolean;

    remedios: IRemedio[];

    receitas: IReceita[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private posologiaService: PosologiaService,
        private remedioService: RemedioService,
        private receitaService: ReceitaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ posologia }) => {
            this.posologia = posologia;
        });
        this.remedioService.query().subscribe(
            (res: HttpResponse<IRemedio[]>) => {
                this.remedios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.receitaService.query().subscribe(
            (res: HttpResponse<IReceita[]>) => {
                this.receitas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.posologia.id !== undefined) {
            this.subscribeToSaveResponse(this.posologiaService.update(this.posologia));
        } else {
            this.subscribeToSaveResponse(this.posologiaService.create(this.posologia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPosologia>>) {
        result.subscribe((res: HttpResponse<IPosologia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRemedioById(index: number, item: IRemedio) {
        return item.id;
    }

    trackReceitaById(index: number, item: IReceita) {
        return item.id;
    }
}
