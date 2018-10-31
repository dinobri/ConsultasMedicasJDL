import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISintoma } from 'app/shared/model/sintoma.model';
import { Principal } from 'app/core';
import { SintomaService } from './sintoma.service';

@Component({
    selector: 'jhi-sintoma',
    templateUrl: './sintoma.component.html'
})
export class SintomaComponent implements OnInit, OnDestroy {
    sintomas: ISintoma[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sintomaService: SintomaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.sintomaService.query().subscribe(
            (res: HttpResponse<ISintoma[]>) => {
                this.sintomas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSintomas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISintoma) {
        return item.id;
    }

    registerChangeInSintomas() {
        this.eventSubscriber = this.eventManager.subscribe('sintomaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
