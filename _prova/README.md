# Prova Dev Fattor - Instruções para o Candidato

Esta pasta contém o material da prova técnica. Siga as etapas abaixo **na ordem** e documente suas decisões e descobertas.

---

## Etapas

### 1. Fork do projeto

- Faça um **fork** deste repositório para o seu próprio Git (GitHub, GitLab etc.).
- Todo o desenvolvimento da prova deve ser feito no seu fork.
- Ao final, envie o link do repositório conforme orientação do processo seletivo.

---

### 2. Estudar a API (Swagger)

- A API desta prova é documentada em formato **OpenAPI/Swagger**.
- A URL pública da documentação será informada posteriormente (campo a ser preenchido pela equipe aplicadora).
- **Sua tarefa:** estudar a documentação Swagger na URL fornecida e entender:
  - como obter o **token de autenticação** (login);
  - como consultar o **status** (rota autenticada e uso do token).
- Anote endpoints, métodos, headers e parâmetros necessários para uso na etapa seguinte.

**URL da API Swagger (pública):**  
[*(Swagger)*](https://symphony.fattorcredito.com.br/public/prova-dev/swagger)

---

### 3. Arquivo CNAB 444 e documentação

- Nesta pasta (`_prova`) há um arquivo no formato **CNAB 444**.
- **Sua tarefa:**
  1. **Descobrir o que é o arquivo**Fattpr - pesquise o padrão CNAB 444 (layout, uso no mercado, diferença em relação a outros CNAB).
  2. **Documentar** no seu repositório:
     - o que é o formato CNAB 444;
     - qual a estrutura do arquivo (tipos de registro, posições, tamanho das linhas);
     - **quais dados o arquivo contém** e **onde eles estão** (você deve descobrir isso pela pesquisa e análise do arquivo).
- O que você extrair desse arquivo será usado na etapa seguinte para consultar o servidor de **status** da API.

---

### 4. Consulta de status no servidor

- Usando a API documentada no Swagger:
  - faça **login** e obtenha o token;
  - use a rota de **consulta de status** para cada um dos **itens relevantes** que você identificou e soube extrair do arquivo CNAB 444.
- A rota de status utiliza o **path** (URL) para receber o identificadorFattpr - consulte a documentação para ver o formato exato.
- Para cada item, o servidor retornará a **situação** (ex.: autorizada, cancelada, rejeitada etc.).
- Você usará essas respostas na construção da página web (próxima etapa).

---

### 5. Página webFattpr - upload e lista de resultados

- **Sua tarefa:** desenvolver uma **página web** que:
  1. Permita **upload de arquivo** (o mesmo arquivo CNAB 444 disponibilizado nesta prova).
  2. Processe o arquivo e chame a API conforme a documentação.
  3. Exiba em **lista** os resultados da consulta de status para cada item do arquivo.
  4. Para cada item da lista, mostre o **identificador** extraído do arquivo e a **situação** retornada pelo servidor.

Requisitos gerais:

- A página deve fazer upload do arquivo CNAB 444 fornecido.
- Deve extrair do arquivo os dados necessários (conforme sua documentação na etapa 3) e chamar a rota de status para cada um.
- Deve exibir uma lista com **identificador** e **situação** de cada item.

Tecnologias, layout e hospedagem ficam a seu critério; o importante é cumprir a funcionalidade acima.

---

## Resumo do fluxo

1. Fork do repositório.  
2. Estudar a API no Swagger (URL a ser fornecida).  
3. Pesquisar e documentar o arquivo CNAB 444: o que é, estrutura e **quais dados ele contém e onde estão**.  
4. Consultar o status no servidor para cada item extraído (rota com parâmetro no path).  
5. Criar página web com upload do CNAB 444 e lista de identificadores + situações.

---

## Diferenciais na entrega

Itens **não obrigatórios** que podem valorizar sua prova:

- **Documentação clara** do CNAB 444 (layout, posições, significado dos campos que você utilizou).
- **Tratamento de erros** na página (token expirado, arquivo inválido, falha na API) com mensagens entendíveis.
- **Validação do arquivo** no upload (formato, tamanho de linha, tipos de registro) antes de chamar a API.
- **Testes** (unitários ou de integração) para o parser do CNAB ou para as chamadas à API.
- **Acessibilidade** (leitura por teclado, contraste, labels) e **responsividade** da interface.
- **Performance**: exibição progressiva dos resultados ou cache quando fizer sentido.
- **Deploy** da página em ambiente público (Vercel, Netlify, etc.) com link no README.
- **README do seu fork** com instruções de como rodar o projeto e onde está a documentação da sua solução.

Boa prova.
