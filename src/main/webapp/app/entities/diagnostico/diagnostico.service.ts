import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiagnostico } from 'app/shared/model/diagnostico.model';

type EntityResponseType = HttpResponse<IDiagnostico>;
type EntityArrayResponseType = HttpResponse<IDiagnostico[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosticoService {
    public resourceUrl = SERVER_API_URL + 'api/diagnosticos';

    constructor(private http: HttpClient) {}

    create(diagnostico: IDiagnostico): Observable<EntityResponseType> {
        return this.http.post<IDiagnostico>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    update(diagnostico: IDiagnostico): Observable<EntityResponseType> {
        return this.http.put<IDiagnostico>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiagnostico>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiagnostico[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
