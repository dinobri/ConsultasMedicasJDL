/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { AgendamentoConsultaComponent } from 'app/entities/agendamento-consulta/agendamento-consulta.component';
import { AgendamentoConsultaService } from 'app/entities/agendamento-consulta/agendamento-consulta.service';
import { AgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

describe('Component Tests', () => {
    describe('AgendamentoConsulta Management Component', () => {
        let comp: AgendamentoConsultaComponent;
        let fixture: ComponentFixture<AgendamentoConsultaComponent>;
        let service: AgendamentoConsultaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [AgendamentoConsultaComponent],
                providers: []
            })
                .overrideTemplate(AgendamentoConsultaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgendamentoConsultaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendamentoConsultaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AgendamentoConsulta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.agendamentoConsultas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
