/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { PosologiaComponent } from 'app/entities/posologia/posologia.component';
import { PosologiaService } from 'app/entities/posologia/posologia.service';
import { Posologia } from 'app/shared/model/posologia.model';

describe('Component Tests', () => {
    describe('Posologia Management Component', () => {
        let comp: PosologiaComponent;
        let fixture: ComponentFixture<PosologiaComponent>;
        let service: PosologiaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [PosologiaComponent],
                providers: []
            })
                .overrideTemplate(PosologiaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PosologiaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PosologiaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Posologia(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.posologias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
