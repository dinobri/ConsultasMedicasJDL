import { IDoenca } from 'app/shared/model//doenca.model';

export interface ISintoma {
    id?: number;
    nome?: string;
    doencas?: IDoenca[];
}

export class Sintoma implements ISintoma {
    constructor(public id?: number, public nome?: string, public doencas?: IDoenca[]) {}
}
