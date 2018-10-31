import { IPosologia } from 'app/shared/model//posologia.model';

export interface IRemedio {
    id?: number;
    nome?: string;
    principoAtivo?: string;
    concentracao?: number;
    posologias?: IPosologia[];
}

export class Remedio implements IRemedio {
    constructor(
        public id?: number,
        public nome?: string,
        public principoAtivo?: string,
        public concentracao?: number,
        public posologias?: IPosologia[]
    ) {}
}
