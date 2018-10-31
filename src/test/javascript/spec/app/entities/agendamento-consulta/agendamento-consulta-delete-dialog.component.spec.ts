/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { AgendamentoConsultaDeleteDialogComponent } from 'app/entities/agendamento-consulta/agendamento-consulta-delete-dialog.component';
import { AgendamentoConsultaService } from 'app/entities/agendamento-consulta/agendamento-consulta.service';

describe('Component Tests', () => {
    describe('AgendamentoConsulta Management Delete Component', () => {
        let comp: AgendamentoConsultaDeleteDialogComponent;
        let fixture: ComponentFixture<AgendamentoConsultaDeleteDialogComponent>;
        let service: AgendamentoConsultaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [AgendamentoConsultaDeleteDialogComponent]
            })
                .overrideTemplate(AgendamentoConsultaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AgendamentoConsultaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgendamentoConsultaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
