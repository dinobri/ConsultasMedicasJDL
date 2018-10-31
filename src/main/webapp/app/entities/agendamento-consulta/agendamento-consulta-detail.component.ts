import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

@Component({
    selector: 'jhi-agendamento-consulta-detail',
    templateUrl: './agendamento-consulta-detail.component.html'
})
export class AgendamentoConsultaDetailComponent implements OnInit {
    agendamentoConsulta: IAgendamentoConsulta;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ agendamentoConsulta }) => {
            this.agendamentoConsulta = agendamentoConsulta;
        });
    }

    previousState() {
        window.history.back();
    }
}
