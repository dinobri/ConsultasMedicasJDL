/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { PosologiaUpdateComponent } from 'app/entities/posologia/posologia-update.component';
import { PosologiaService } from 'app/entities/posologia/posologia.service';
import { Posologia } from 'app/shared/model/posologia.model';

describe('Component Tests', () => {
    describe('Posologia Management Update Component', () => {
        let comp: PosologiaUpdateComponent;
        let fixture: ComponentFixture<PosologiaUpdateComponent>;
        let service: PosologiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [PosologiaUpdateComponent]
            })
                .overrideTemplate(PosologiaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PosologiaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Posologia(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.posologia = entity;
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
                    const entity = new Posologia();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.posologia = entity;
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
