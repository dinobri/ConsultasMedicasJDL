import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IConsulta } from 'app/shared/model/consulta.model';
import { Principal } from 'app/core';
import { ConsultaService } from './consulta.service';

@Component({
    selector: 'jhi-consulta',
    templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit, OnDestroy {
    consultas: IConsulta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consultaService: ConsultaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.consultaService.query().subscribe(
            (res: HttpResponse<IConsulta[]>) => {
                this.consultas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IConsulta) {
        return item.id;
    }

    registerChangeInConsultas() {
        this.eventSubscriber = this.eventManager.subscribe('consultaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
