import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receita } from 'app/shared/model/receita.model';
import { ReceitaService } from './receita.service';
import { ReceitaComponent } from './receita.component';
import { ReceitaDetailComponent } from './receita-detail.component';
import { ReceitaUpdateComponent } from './receita-update.component';
import { ReceitaDeletePopupComponent } from './receita-delete-dialog.component';
import { IReceita } from 'app/shared/model/receita.model';

@Injectable({ providedIn: 'root' })
export class ReceitaResolve implements Resolve<IReceita> {
    constructor(private service: ReceitaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receita: HttpResponse<Receita>) => receita.body));
        }
        return of(new Receita());
    }
}

export const receitaRoute: Routes = [
    {
        path: 'receita',
        component: ReceitaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receita/:id/view',
        component: ReceitaDetailComponent,
        resolve: {
            receita: ReceitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receita/new',
        component: ReceitaUpdateComponent,
        resolve: {
            receita: ReceitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receitas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receita/:id/edit',
        component: ReceitaUpdateComponent,
        resolve: {
            receita: ReceitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receitas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receitaPopupRoute: Routes = [
    {
        path: 'receita/:id/delete',
        component: ReceitaDeletePopupComponent,
        resolve: {
            receita: ReceitaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receitas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
