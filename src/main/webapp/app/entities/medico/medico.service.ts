import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedico } from 'app/shared/model/medico.model';

type EntityResponseType = HttpResponse<IMedico>;
type EntityArrayResponseType = HttpResponse<IMedico[]>;

@Injectable({ providedIn: 'root' })
export class MedicoService {
    public resourceUrl = SERVER_API_URL + 'api/medicos';

    constructor(private http: HttpClient) {}

    create(medico: IMedico): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medico);
        return this.http
            .post<IMedico>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(medico: IMedico): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(medico);
        return this.http
            .put<IMedico>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMedico>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMedico[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(medico: IMedico): IMedico {
        const copy: IMedico = Object.assign({}, medico, {
            dataNascimento:
                medico.dataNascimento != null && medico.dataNascimento.isValid() ? medico.dataNascimento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataNascimento = res.body.dataNascimento != null ? moment(res.body.dataNascimento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((medico: IMedico) => {
            medico.dataNascimento = medico.dataNascimento != null ? moment(medico.dataNascimento) : null;
        });
        return res;
    }
}
