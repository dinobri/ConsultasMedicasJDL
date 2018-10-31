import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReceita } from 'app/shared/model/receita.model';
import { Principal } from 'app/core';
import { ReceitaService } from './receita.service';

@Component({
    selector: 'jhi-receita',
    templateUrl: './receita.component.html'
})
export class ReceitaComponent implements OnInit, OnDestroy {
    receitas: IReceita[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private receitaService: ReceitaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.receitaService.query().subscribe(
            (res: HttpResponse<IReceita[]>) => {
                this.receitas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReceitas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReceita) {
        return item.id;
    }

    registerChangeInReceitas() {
        this.eventSubscriber = this.eventManager.subscribe('receitaListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
