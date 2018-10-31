import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceita } from 'app/shared/model/receita.model';

@Component({
    selector: 'jhi-receita-detail',
    templateUrl: './receita-detail.component.html'
})
export class ReceitaDetailComponent implements OnInit {
    receita: IReceita;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receita }) => {
            this.receita = receita;
        });
    }

    previousState() {
        window.history.back();
    }
}
