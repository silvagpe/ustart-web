import { v4 as uuidv4 } from 'uuid';

export class Usuario {
    public id: string;
    public email: string;
    public nome: string;
    public senha: string;
    public ativo: boolean;
    public dataRegistro: Date;

    constructor(init?: Partial<Usuario>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
        }
    }
}
