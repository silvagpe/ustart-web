import { v4 as uuidv4 } from 'uuid';

export class Grupo {
    public id: string;
    public descricao: string;
    public codigoExterno: string;

    constructor(init?: Partial<Grupo>) {
        debugger;
        if (init) {
            Object.assign(this, init);
        } else {
            this.id = uuidv4();
        }
    }
}