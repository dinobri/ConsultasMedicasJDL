import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPaciente } from 'app/shared/model/paciente.model';
import { Principal } from 'app/core';
import { PacienteService } from './paciente.service';

@Component({
    selector: 'jhi-paciente',
    templateUrl: './paciente.component.html'
})
export class PacienteComponent implements OnInit, OnDestroy {
    pacientes: IPaciente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private pacienteService: PacienteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.pacienteService.query().subscribe(
            (res: HttpResponse<IPaciente[]>) => {
                this.pacientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPacientes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPaciente) {
        return item.id;
    }

    registerChangeInPacientes() {
        this.eventSubscriber = this.eventManager.subscribe('pacienteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
