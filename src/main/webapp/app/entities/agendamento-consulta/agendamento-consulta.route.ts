import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';
import { AgendamentoConsultaService } from './agendamento-consulta.service';
import { AgendamentoConsultaComponent } from './agendamento-consulta.component';
import { AgendamentoConsultaDetailComponent } from './agendamento-consulta-detail.component';
import { AgendamentoConsultaUpdateComponent } from './agendamento-consulta-update.component';
import { AgendamentoConsultaDeletePopupComponent } from './agendamento-consulta-delete-dialog.component';
import { IAgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

@Injectable({ providedIn: 'root' })
export class AgendamentoConsultaResolve implements Resolve<IAgendamentoConsulta> {
    constructor(private service: AgendamentoConsultaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((agendamentoConsulta: HttpResponse<AgendamentoConsulta>) => agendamentoConsulta.body));
        }
        return of(new AgendamentoConsulta());
    }
}

export const agendamentoConsultaRoute: Routes = [
    {
        path: 'agendamento-consulta',
        component: AgendamentoConsultaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgendamentoConsultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agendamento-consulta/:id/view',
        component: AgendamentoConsultaDetailComponent,
        resolve: {
            agendamentoConsulta: AgendamentoConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgendamentoConsultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agendamento-consulta/new',
        component: AgendamentoConsultaUpdateComponent,
        resolve: {
            agendamentoConsulta: AgendamentoConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgendamentoConsultas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'agendamento-consulta/:id/edit',
        component: AgendamentoConsultaUpdateComponent,
        resolve: {
            agendamentoConsulta: AgendamentoConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgendamentoConsultas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agendamentoConsultaPopupRoute: Routes = [
    {
        path: 'agendamento-consulta/:id/delete',
        component: AgendamentoConsultaDeletePopupComponent,
        resolve: {
            agendamentoConsulta: AgendamentoConsultaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AgendamentoConsultas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
