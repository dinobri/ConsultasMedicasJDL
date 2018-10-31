/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { PosologiaDetailComponent } from 'app/entities/posologia/posologia-detail.component';
import { Posologia } from 'app/shared/model/posologia.model';

describe('Component Tests', () => {
    describe('Posologia Management Detail Component', () => {
        let comp: PosologiaDetailComponent;
        let fixture: ComponentFixture<PosologiaDetailComponent>;
        const route = ({ data: of({ posologia: new Posologia(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [PosologiaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PosologiaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PosologiaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.posologia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
