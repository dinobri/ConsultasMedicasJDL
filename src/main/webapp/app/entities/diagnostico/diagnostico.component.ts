import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiagnostico } from 'app/shared/model/diagnostico.model';
import { Principal } from 'app/core';
import { DiagnosticoService } from './diagnostico.service';

@Component({
    selector: 'jhi-diagnostico',
    templateUrl: './diagnostico.component.html'
})
export class DiagnosticoComponent implements OnInit, OnDestroy {
    diagnosticos: IDiagnostico[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private diagnosticoService: DiagnosticoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.diagnosticoService.query().subscribe(
            (res: HttpResponse<IDiagnostico[]>) => {
                this.diagnosticos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiagnosticos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiagnostico) {
        return item.id;
    }

    registerChangeInDiagnosticos() {
        this.eventSubscriber = this.eventManager.subscribe('diagnosticoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
