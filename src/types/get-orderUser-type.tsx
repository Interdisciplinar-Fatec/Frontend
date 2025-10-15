type productType = {
    id: string,
    nome: string,
    preco: number,
    marca: string,
    descricao: string | null,
}

type Order = {
    PedidoId: string;
    DataPedido: string;
    ValorPedido: string;
    descricaoPedido: string;
    Produtos: productType[];
};

export type getOrderUserType = {
    user: {
        id: string,
        name: string,
        CPF: string,
        data_nascimento: string,
        endereco: string,
        telefone: string,
        email: string,
        createdAt: Date,
    }
    pedidos: Order[]
};
