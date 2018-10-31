/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { ConsultaComponent } from 'app/entities/consulta/consulta.component';
import { ConsultaService } from 'app/entities/consulta/consulta.service';
import { Consulta } from 'app/shared/model/consulta.model';

describe('Component Tests', () => {
    describe('Consulta Management Component', () => {
        let comp: ConsultaComponent;
        let fixture: ComponentFixture<ConsultaComponent>;
        let service: ConsultaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [ConsultaComponent],
                providers: []
            })
                .overrideTemplate(ConsultaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsultaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Consulta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.consultas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
