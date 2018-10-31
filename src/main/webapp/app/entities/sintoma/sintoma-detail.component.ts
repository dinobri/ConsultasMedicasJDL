import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISintoma } from 'app/shared/model/sintoma.model';

@Component({
    selector: 'jhi-sintoma-detail',
    templateUrl: './sintoma-detail.component.html'
})
export class SintomaDetailComponent implements OnInit {
    sintoma: ISintoma;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sintoma }) => {
            this.sintoma = sintoma;
        });
    }

    previousState() {
        window.history.back();
    }
}
