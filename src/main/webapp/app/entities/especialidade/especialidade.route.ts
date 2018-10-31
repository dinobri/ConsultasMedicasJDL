import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialidade } from 'app/shared/model/especialidade.model';
import { EspecialidadeService } from './especialidade.service';
import { EspecialidadeComponent } from './especialidade.component';
import { EspecialidadeDetailComponent } from './especialidade-detail.component';
import { EspecialidadeUpdateComponent } from './especialidade-update.component';
import { EspecialidadeDeletePopupComponent } from './especialidade-delete-dialog.component';
import { IEspecialidade } from 'app/shared/model/especialidade.model';

@Injectable({ providedIn: 'root' })
export class EspecialidadeResolve implements Resolve<IEspecialidade> {
    constructor(private service: EspecialidadeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((especialidade: HttpResponse<Especialidade>) => especialidade.body));
        }
        return of(new Especialidade());
    }
}

export const especialidadeRoute: Routes = [
    {
        path: 'especialidade',
        component: EspecialidadeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especialidades'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especialidade/:id/view',
        component: EspecialidadeDetailComponent,
        resolve: {
            especialidade: EspecialidadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especialidades'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especialidade/new',
        component: EspecialidadeUpdateComponent,
        resolve: {
            especialidade: EspecialidadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especialidades'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'especialidade/:id/edit',
        component: EspecialidadeUpdateComponent,
        resolve: {
            especialidade: EspecialidadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especialidades'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const especialidadePopupRoute: Routes = [
    {
        path: 'especialidade/:id/delete',
        component: EspecialidadeDeletePopupComponent,
        resolve: {
            especialidade: EspecialidadeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Especialidades'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
