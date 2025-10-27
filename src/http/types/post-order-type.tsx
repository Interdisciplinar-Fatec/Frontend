export type PostOrderType = {
    CPF: string,
    name: string,
    email: string,
    endereco: string,
    data_nascimento: string,
    telefone: string,
    valor_total: number,
    descricao:string,
    items: 
    {
        id_produto: string,
        quantidade: number
    }[]
}