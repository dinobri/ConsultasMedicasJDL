/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { DiagnosticoComponent } from 'app/entities/diagnostico/diagnostico.component';
import { DiagnosticoService } from 'app/entities/diagnostico/diagnostico.service';
import { Diagnostico } from 'app/shared/model/diagnostico.model';

describe('Component Tests', () => {
    describe('Diagnostico Management Component', () => {
        let comp: DiagnosticoComponent;
        let fixture: ComponentFixture<DiagnosticoComponent>;
        let service: DiagnosticoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [DiagnosticoComponent],
                providers: []
            })
                .overrideTemplate(DiagnosticoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiagnosticoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Diagnostico(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.diagnosticos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
