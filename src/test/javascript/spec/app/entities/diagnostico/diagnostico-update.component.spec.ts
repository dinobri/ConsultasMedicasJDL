/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { DiagnosticoUpdateComponent } from 'app/entities/diagnostico/diagnostico-update.component';
import { DiagnosticoService } from 'app/entities/diagnostico/diagnostico.service';
import { Diagnostico } from 'app/shared/model/diagnostico.model';

describe('Component Tests', () => {
    describe('Diagnostico Management Update Component', () => {
        let comp: DiagnosticoUpdateComponent;
        let fixture: ComponentFixture<DiagnosticoUpdateComponent>;
        let service: DiagnosticoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [DiagnosticoUpdateComponent]
            })
                .overrideTemplate(DiagnosticoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosticoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Diagnostico(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnostico = entity;
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
                    const entity = new Diagnostico();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.diagnostico = entity;
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
