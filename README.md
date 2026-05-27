# IntegraCAR - Classificador de Intencoes

Interface web para testar e documentar um classificador de intencoes em portugues baseado em BERT. O frontend permite enviar perguntas, consultar a classe prevista pelo modelo e acessar uma pagina de documentacao da API.

## Funcionalidades

- Classificacao de perguntas pela rota `/api/classificar`.
- Exibicao da classe prevista e do nivel de confianca.
- Pagina de documentacao com exemplos de request/response.
- Layout responsivo com React, Vite, Tailwind CSS e Motion.
- Execucao local com proxy do Vite para a API.
- Execucao em Docker com Nginx servindo o frontend e proxy para a API.

## Tecnologias

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Lucide React
- Motion
- Docker
- Nginx

## Requisitos

Para rodar localmente:

- Node.js 22 ou compativel
- npm
- API do classificador rodando em `http://localhost:8000`

Para rodar com Docker:

- Docker
- Docker Compose

## Rodando Localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:5173
```

No ambiente local, o Vite redireciona chamadas de `/api/*` para:

```text
http://localhost:8000
```

Por isso, a API precisa estar ativa localmente para o classificador funcionar.

## Build de Producao

Gere os arquivos estaticos:

```bash
npm run build
```

O resultado sera gerado em:

```text
dist/
```

## Rodando com Docker

O `docker-compose.yml` usa a imagem da API:

```text
integracar/redeneuralbert:8.0
```

Antes de subir os containers, crie a rede externa `proxy` caso ela ainda nao exista:

```bash
docker network create proxy
```

Suba o projeto:

```bash
docker-compose up --build
```

Acesse:

```text
http://localhost:5173
```

No Docker, o Nginx serve o frontend e encaminha `/api/` para o container da API na porta `8000`.

## Variaveis de Ambiente

O frontend usa `VITE_API_URL` para definir o endpoint de classificacao.

Valor padrao:

```text
/api/classificar
```

No Dockerfile, esse valor pode ser alterado via build arg:

```bash
docker build --build-arg VITE_API_URL=/api/classificar -t integracar-frontend .
```

## Estrutura do Projeto

```text
src/
  app/
    components/     Componentes compartilhados e layout principal
    pages/          Paginas da aplicacao
    App.tsx         Provider do roteador
    routes.ts       Definicao das rotas
  assets/
    images/         Imagens e logo do projeto
  styles/           Estilos globais e tema
```

Arquivos principais:

- `src/app/components/Root.tsx`: layout principal, header, footer e menu.
- `src/app/pages/HomePage.tsx`: pagina inicial com o classificador.
- `src/app/pages/DocsPage.tsx`: documentacao da API.
- `src/assets/images/logo-removebg-preview.png`: logo usada no header e favicon.
- `vite.config.ts`: configuracao do Vite e proxy local da API.
- `nginx.conf`: configuracao do Nginx para producao em Docker.
- `docker-compose.yml`: orquestracao do frontend e da API.

## Endpoint da API

Rota usada pelo frontend:

```http
POST /api/classificar
```

Exemplo de request:

```json
{
  "texto": "Como posso abrir um processo corretamente no Simlam?"
}
```

Exemplo de response:

```json
{
  "classe": "Manual",
  "confianca": 0.9534
}
```

## Solucao de Problemas

Se o frontend carregar, mas a classificacao falhar, verifique se a API esta rodando e respondendo na porta `8000`.

Se o Docker Compose reclamar da rede `proxy`, crie a rede manualmente:

```bash
docker network create proxy
```

Se o PowerShell bloquear `npm`, use:

```powershell
npm.cmd run dev
npm.cmd run build
```
