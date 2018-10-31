/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PacienteService } from 'app/entities/paciente/paciente.service';
import { IPaciente, Paciente } from 'app/shared/model/paciente.model';

describe('Service Tests', () => {
    describe('Paciente Service', () => {
        let injector: TestBed;
        let service: PacienteService;
        let httpMock: HttpTestingController;
        let elemDefault: IPaciente;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PacienteService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Paciente(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0, 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dataNascimento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Paciente', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dataNascimento: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataNascimento: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Paciente(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Paciente', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        numeroDocumento: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_FORMAT),
                        altura: 1,
                        peso: 1,
                        amf: 'BBBBBB',
                        amp: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dataNascimento: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Paciente', async () => {
                const returnedFromService = Object.assign(
                    {
                        nome: 'BBBBBB',
                        numeroDocumento: 'BBBBBB',
                        dataNascimento: currentDate.format(DATE_FORMAT),
                        altura: 1,
                        peso: 1,
                        amf: 'BBBBBB',
                        amp: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dataNascimento: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Paciente', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
