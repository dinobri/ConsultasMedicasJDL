import { IRemedio } from 'app/shared/model//remedio.model';
import { IReceita } from 'app/shared/model//receita.model';

export interface IPosologia {
    id?: number;
    periodo?: number;
    duracao?: number;
    quantidade?: number;
    observacao?: string;
    remedio?: IRemedio;
    receita?: IReceita;
}

export class Posologia implements IPosologia {
    constructor(
        public id?: number,
        public periodo?: number,
        public duracao?: number,
        public quantidade?: number,
        public observacao?: string,
        public remedio?: IRemedio,
        public receita?: IReceita
    ) {}
}
