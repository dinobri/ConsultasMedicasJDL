import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    ReceitaComponent,
    ReceitaDetailComponent,
    ReceitaUpdateComponent,
    ReceitaDeletePopupComponent,
    ReceitaDeleteDialogComponent,
    receitaRoute,
    receitaPopupRoute
} from './';

const ENTITY_STATES = [...receitaRoute, ...receitaPopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceitaComponent,
        ReceitaDetailComponent,
        ReceitaUpdateComponent,
        ReceitaDeleteDialogComponent,
        ReceitaDeletePopupComponent
    ],
    entryComponents: [ReceitaComponent, ReceitaUpdateComponent, ReceitaDeleteDialogComponent, ReceitaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlReceitaModule {}
