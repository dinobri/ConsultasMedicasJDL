import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultasMedicasJdlSharedModule } from 'app/shared';
import {
    AgendamentoConsultaComponent,
    AgendamentoConsultaDetailComponent,
    AgendamentoConsultaUpdateComponent,
    AgendamentoConsultaDeletePopupComponent,
    AgendamentoConsultaDeleteDialogComponent,
    agendamentoConsultaRoute,
    agendamentoConsultaPopupRoute
} from './';

const ENTITY_STATES = [...agendamentoConsultaRoute, ...agendamentoConsultaPopupRoute];

@NgModule({
    imports: [ConsultasMedicasJdlSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AgendamentoConsultaComponent,
        AgendamentoConsultaDetailComponent,
        AgendamentoConsultaUpdateComponent,
        AgendamentoConsultaDeleteDialogComponent,
        AgendamentoConsultaDeletePopupComponent
    ],
    entryComponents: [
        AgendamentoConsultaComponent,
        AgendamentoConsultaUpdateComponent,
        AgendamentoConsultaDeleteDialogComponent,
        AgendamentoConsultaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlAgendamentoConsultaModule {}
