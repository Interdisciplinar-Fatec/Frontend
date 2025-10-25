export type getProductType = {
    id: string,
    nome: string,
    preco: number,
    marca: string,
    descricao: string | null,
}[]

export type createProdcutType = {
    nome: string,
    preco: number,
    marca: string,
    descricao: string | undefined,
}