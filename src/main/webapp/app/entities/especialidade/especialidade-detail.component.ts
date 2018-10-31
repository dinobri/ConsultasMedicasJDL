import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEspecialidade } from 'app/shared/model/especialidade.model';

@Component({
    selector: 'jhi-especialidade-detail',
    templateUrl: './especialidade-detail.component.html'
})
export class EspecialidadeDetailComponent implements OnInit {
    especialidade: IEspecialidade;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ especialidade }) => {
            this.especialidade = especialidade;
        });
    }

    previousState() {
        window.history.back();
    }
}
