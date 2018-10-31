/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { AgendamentoConsultaUpdateComponent } from 'app/entities/agendamento-consulta/agendamento-consulta-update.component';
import { AgendamentoConsultaService } from 'app/entities/agendamento-consulta/agendamento-consulta.service';
import { AgendamentoConsulta } from 'app/shared/model/agendamento-consulta.model';

describe('Component Tests', () => {
    describe('AgendamentoConsulta Management Update Component', () => {
        let comp: AgendamentoConsultaUpdateComponent;
        let fixture: ComponentFixture<AgendamentoConsultaUpdateComponent>;
        let service: AgendamentoConsultaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [AgendamentoConsultaUpdateComponent]
            })
                .overrideTemplate(AgendamentoConsultaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AgendamentoConsultaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendamentoConsultaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgendamentoConsulta(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agendamentoConsulta = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AgendamentoConsulta();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.agendamentoConsulta = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
