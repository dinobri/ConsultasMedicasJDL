import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConsultasMedicasJdlEspecialidadeModule } from './especialidade/especialidade.module';
import { ConsultasMedicasJdlMedicoModule } from './medico/medico.module';
import { ConsultasMedicasJdlPacienteModule } from './paciente/paciente.module';
import { ConsultasMedicasJdlConsultaModule } from './consulta/consulta.module';
import { ConsultasMedicasJdlAgendamentoConsultaModule } from './agendamento-consulta/agendamento-consulta.module';
import { ConsultasMedicasJdlConsultorioModule } from './consultorio/consultorio.module';
import { ConsultasMedicasJdlReceitaModule } from './receita/receita.module';
import { ConsultasMedicasJdlRemedioModule } from './remedio/remedio.module';
import { ConsultasMedicasJdlPosologiaModule } from './posologia/posologia.module';
import { ConsultasMedicasJdlDiagnosticoModule } from './diagnostico/diagnostico.module';
import { ConsultasMedicasJdlDoencaModule } from './doenca/doenca.module';
import { ConsultasMedicasJdlSintomaModule } from './sintoma/sintoma.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ConsultasMedicasJdlEspecialidadeModule,
        ConsultasMedicasJdlMedicoModule,
        ConsultasMedicasJdlPacienteModule,
        ConsultasMedicasJdlConsultaModule,
        ConsultasMedicasJdlAgendamentoConsultaModule,
        ConsultasMedicasJdlConsultorioModule,
        ConsultasMedicasJdlReceitaModule,
        ConsultasMedicasJdlRemedioModule,
        ConsultasMedicasJdlPosologiaModule,
        ConsultasMedicasJdlDiagnosticoModule,
        ConsultasMedicasJdlDoencaModule,
        ConsultasMedicasJdlSintomaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultasMedicasJdlEntityModule {}
