/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { ConsultaDetailComponent } from 'app/entities/consulta/consulta-detail.component';
import { Consulta } from 'app/shared/model/consulta.model';

describe('Component Tests', () => {
    describe('Consulta Management Detail Component', () => {
        let comp: ConsultaDetailComponent;
        let fixture: ComponentFixture<ConsultaDetailComponent>;
        const route = ({ data: of({ consulta: new Consulta(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [ConsultaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsultaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsultaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.consulta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
