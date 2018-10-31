import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Remedio } from 'app/shared/model/remedio.model';
import { RemedioService } from './remedio.service';
import { RemedioComponent } from './remedio.component';
import { RemedioDetailComponent } from './remedio-detail.component';
import { RemedioUpdateComponent } from './remedio-update.component';
import { RemedioDeletePopupComponent } from './remedio-delete-dialog.component';
import { IRemedio } from 'app/shared/model/remedio.model';

@Injectable({ providedIn: 'root' })
export class RemedioResolve implements Resolve<IRemedio> {
    constructor(private service: RemedioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((remedio: HttpResponse<Remedio>) => remedio.body));
        }
        return of(new Remedio());
    }
}

export const remedioRoute: Routes = [
    {
        path: 'remedio',
        component: RemedioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Remedios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'remedio/:id/view',
        component: RemedioDetailComponent,
        resolve: {
            remedio: RemedioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Remedios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'remedio/new',
        component: RemedioUpdateComponent,
        resolve: {
            remedio: RemedioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Remedios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'remedio/:id/edit',
        component: RemedioUpdateComponent,
        resolve: {
            remedio: RemedioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Remedios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const remedioPopupRoute: Routes = [
    {
        path: 'remedio/:id/delete',
        component: RemedioDeletePopupComponent,
        resolve: {
            remedio: RemedioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Remedios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
