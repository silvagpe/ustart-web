import { v4 as uuidv4 } from 'uuid';

export class Produto {
    public id: string
    public grupoProdutoId: string
    public nome: string
    public descricao: string
    public preco: number
    public urlImagem: string
    public codigoExterno: string

    constructor(inicial?: Partial<Produto>) {        
        if (inicial) {
            Object.assign(this, inicial);
        } else {
            this.id = uuidv4();
        }
    }
}


