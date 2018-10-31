import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPaciente } from 'app/shared/model/paciente.model';

type EntityResponseType = HttpResponse<IPaciente>;
type EntityArrayResponseType = HttpResponse<IPaciente[]>;

@Injectable({ providedIn: 'root' })
export class PacienteService {
    public resourceUrl = SERVER_API_URL + 'api/pacientes';

    constructor(private http: HttpClient) {}

    create(paciente: IPaciente): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(paciente);
        return this.http
            .post<IPaciente>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(paciente: IPaciente): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(paciente);
        return this.http
            .put<IPaciente>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPaciente>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPaciente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(paciente: IPaciente): IPaciente {
        const copy: IPaciente = Object.assign({}, paciente, {
            dataNascimento:
                paciente.dataNascimento != null && paciente.dataNascimento.isValid() ? paciente.dataNascimento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((paciente: IPaciente) => {
            paciente.dataNascimento = paciente.dataNascimento != null ? moment(paciente.dataNascimento) : null;
        });
        return res;
    }
}
