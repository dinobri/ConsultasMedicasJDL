/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultasMedicasJdlTestModule } from '../../../test.module';
import { SintomaDetailComponent } from 'app/entities/sintoma/sintoma-detail.component';
import { Sintoma } from 'app/shared/model/sintoma.model';

describe('Component Tests', () => {
    describe('Sintoma Management Detail Component', () => {
        let comp: SintomaDetailComponent;
        let fixture: ComponentFixture<SintomaDetailComponent>;
        const route = ({ data: of({ sintoma: new Sintoma(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ConsultasMedicasJdlTestModule],
                declarations: [SintomaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SintomaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SintomaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sintoma).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
