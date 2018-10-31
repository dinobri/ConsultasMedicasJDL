import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';
import { Principal } from 'app/core';
import { AgendamentoConsultaService } from './agendamento-consulta.service';

@Component({
    selector: 'jhi-agendamento-consulta',
    templateUrl: './agendamento-consulta.component.html'
})
export class AgendamentoConsultaComponent implements OnInit, OnDestroy {
    agendamentoConsultas: IAgendamentoConsulta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agendamentoConsultaService: AgendamentoConsultaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.agendamentoConsultaService.query().subscribe(
            (res: HttpResponse<IAgendamentoConsulta[]>) => {
                this.agendamentoConsultas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAgendamentoConsultas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAgendamentoConsulta) {
        return item.id;
    }

    registerChangeInAgendamentoConsultas() {
        this.eventSubscriber = this.eventManager.subscribe('agendamentoConsultaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
