# 🛠️ EletroConsertos - Frontend

Este repositório contém o código-fonte do frontend do projeto **EletroConsertos**, desenvolvido como parte de um Projeto Interdisciplinar (PI) da FATEC. A aplicação é uma interface de usuário moderna e responsiva, construída para gerenciar e consultar pedidos de serviços de conserto.

## 🔗 Acesso à Aplicação

A versão mais recente da aplicação está hospedada e disponível publicamente através da Vercel:

[**Acessar EletroConsertos**](https://eletroconsertos.vercel.app/)

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando um *stack* de tecnologias modernas para garantir alta performance, escalabilidade e uma experiência de desenvolvimento eficiente.

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | **React** | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Linguagem** | **TypeScript** | Superset do JavaScript que adiciona tipagem estática, melhorando a manutenibilidade e a detecção de erros. |
| **Build Tool** | **Vite** | Ferramenta de *build* rápida e otimizada para desenvolvimento frontend. |
| **Estilização** | **Tailwind CSS** | Framework CSS *utility-first* para construção rápida de designs customizados. |
| **Componentes** | **Radix UI** | Biblioteca de componentes de baixo nível para acessibilidade e personalização. |
| **Roteamento** | **React Router DOM** | Solução padrão para roteamento declarativo no React. |
| **Gerenciamento de Estado** | **TanStack Query** | Utilizado para gerenciamento de estado assíncrono (caching, sincronização e atualização de dados). |

## 🧪 Credenciais de Teste

Para facilitar a avaliação e o teste das diferentes funcionalidades da aplicação, utilize as seguintes credenciais de acesso:

### Painel Administrativo

Acesse a área de login e utilize estas credenciais para testar as funcionalidades de gerenciamento:

| Campo | Valor |
| :--- | :--- |
| **CPF** | `00000000001` |
| **Senha** | `adm123` |

### Consulta de Pedido (Usuário Comum)

Utilize este CPF na tela de consulta de pedidos para verificar o fluxo do usuário final:

| Campo | Valor |
| :--- | :--- |
| **CPF** | `00000000002` |

## 💻 Configuração e Execução Local

Para configurar e executar o projeto em sua máquina local, siga os passos abaixo:

### Dependência do Backend

Para que o frontend funcione corretamente em ambiente de desenvolvimento, é **obrigatório** que o backend esteja em execução localmente.

O repositório do backend, juntamente com as instruções de configuração, pode ser encontrado aqui:

[**Repositório EletroConsertos - Backend**](https://github.com/Interdisciplinar-Fatec/Backend)

### Configuração do Ambiente Local

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a seguinte variável de ambiente. Esta configuração é essencial para que o frontend se comunique com o backend local:

```
VITE_API_URL=/api
```

### Pré-requisitos

Certifique-se de ter o **Node.js** (versão 18+) e o **pnpm** (ou npm/yarn) instalados.

### 1. Clonar o Repositório

```bash
git clone https://github.com/Interdisciplinar-Fatec/Frontend.git
cd Frontend
```

### 2. Instalar Dependências

Utilize o gerenciador de pacotes de sua preferência:

```bash
# Usando pnpm
pnpm install

# Ou usando npm
npm install
```

### 3. Executar o Servidor de Desenvolvimento

Inicie a aplicação em modo de desenvolvimento. Ela estará acessível em `http://localhost:5173` (ou porta similar).

```bash
pnpm run dev
# ou
npm run dev
```

### 4. Build de Produção

Para gerar uma versão otimizada para produção:

```bash
pnpm run build
# ou
npm run build
```

Os arquivos de produção serão gerados no diretório `dist/`.

---

Desenvolvido por: **Equipe Interdisciplinar FATEC**
