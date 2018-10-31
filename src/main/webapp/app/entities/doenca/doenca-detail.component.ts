import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoenca } from 'app/shared/model/doenca.model';

@Component({
    selector: 'jhi-doenca-detail',
    templateUrl: './doenca-detail.component.html'
})
export class DoencaDetailComponent implements OnInit {
    doenca: IDoenca;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ doenca }) => {
            this.doenca = doenca;
        });
    }

    previousState() {
        window.history.back();
    }
}
