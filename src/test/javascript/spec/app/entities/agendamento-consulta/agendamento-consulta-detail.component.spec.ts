/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { AgendamentoConsultaDetailComponent } from 'app/entities/agendamento-consulta/agendamento-consulta-detail.component';
import { AgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

describe('Component Tests', () => {
    describe('AgendamentoConsulta Management Detail Component', () => {
        let comp: AgendamentoConsultaDetailComponent;
        let fixture: ComponentFixture<AgendamentoConsultaDetailComponent>;
        const route = ({ data: of({ agendamentoConsulta: new AgendamentoConsulta(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [AgendamentoConsultaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AgendamentoConsultaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgendamentoConsultaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.agendamentoConsulta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
