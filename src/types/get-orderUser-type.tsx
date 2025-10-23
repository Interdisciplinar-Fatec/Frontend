type productType = {
    id: string,
    Nome: string,
    Preco: number,
    Marca: string,
    Descricao: string | null,
}

type Order = {
    PedidoId: string;
    Status: string;
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
