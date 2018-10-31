import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Posologia } from 'app/shared/model/posologia.model';
import { PosologiaService } from './posologia.service';
import { PosologiaComponent } from './posologia.component';
import { PosologiaDetailComponent } from './posologia-detail.component';
import { PosologiaUpdateComponent } from './posologia-update.component';
import { PosologiaDeletePopupComponent } from './posologia-delete-dialog.component';
import { IPosologia } from 'app/shared/model/posologia.model';

@Injectable({ providedIn: 'root' })
export class PosologiaResolve implements Resolve<IPosologia> {
    constructor(private service: PosologiaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((posologia: HttpResponse<Posologia>) => posologia.body));
        }
        return of(new Posologia());
    }
}

export const posologiaRoute: Routes = [
    {
        path: 'posologia',
        component: PosologiaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posologias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'posologia/:id/view',
        component: PosologiaDetailComponent,
        resolve: {
            posologia: PosologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posologias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'posologia/new',
        component: PosologiaUpdateComponent,
        resolve: {
            posologia: PosologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posologias'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'posologia/:id/edit',
        component: PosologiaUpdateComponent,
        resolve: {
            posologia: PosologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posologias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const posologiaPopupRoute: Routes = [
    {
        path: 'posologia/:id/delete',
        component: PosologiaDeletePopupComponent,
        resolve: {
            posologia: PosologiaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Posologias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
