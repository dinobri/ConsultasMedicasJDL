import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPosologia } from 'app/shared/model/posologia.model';

@Component({
    selector: 'jhi-posologia-detail',
    templateUrl: './posologia-detail.component.html'
})
export class PosologiaDetailComponent implements OnInit {
    posologia: IPosologia;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ posologia }) => {
            this.posologia = posologia;
        });
    }

    previousState() {
        window.history.back();
    }
}
