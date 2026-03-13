# CNAB

**CNAB** = **Centro Nacional de Automação Bancária**

É um padrão de troca de arquivos entre empresas e bancos no Brasil. Foi definido pela **FEBRABAN** (*Federação Brasileira de Bancos*) para padronizar operações como:

- cobrança de boletos
- pagamentos
- transferências
- conciliações bancárias

É basicamente um **arquivo texto com posições fixas**.

Cada linha do arquivo tem um tamanho exato, e cada posição representa um campo específico.

---

## Tipos de arquivos CNAB

- **240 caracteres** - padrão moderno
- **400 caracteres** - cobrança de boletos
- **444 caracteres** - usado por alguns bancos
- **500 caracteres** - alguns layouts antigos

---

## REMESSA

Arquivo enviado pela empresa ao banco.

**Exemplo:** registrar boleto

REMESSA.REM

---

## RETORNO

Arquivo **enviado pelo banco de volta para a empresa**.

Exemplo de uso:
- boleto pago
- confirmação de registro
- baixa de título

Exemplo de nome de arquivo:

RETORNO.REM

---

# Estrutura do Arquivo CNAB

Um arquivo CNAB normalmente possui **3 tipos de registros**:

| Tipo | Descrição |
|-----|-----------|
| **Header (tipo 0)** | primeira linha do arquivo, contém dados do banco, empresa, data, serviço e tipo do arquivo |
| **Detalhes (tipo 1)** | linhas a partir da segunda, representam títulos ou instruções |
| **Trailer (tipo 9)** | última linha do arquivo, contém totais de registros e valores |

---

# Exemplo
```text
0HEADER
1BOLETO CLIENTE 1 VALOR 100.00
1BOLETO CLIENTE 2 VALOR 250.00
1BOLETO CLIENTE 3 VALOR 80.00
9TOTAL 3
```

---

# Tabela de Significados

## Cobrança (Boletos)

| Código | Significado |
|------|-------------|
| 01 | registrar boleto |
| 02 | baixa |
| 06 | alteração |
| 09 | protestar |

---

## Retorno (Eventos do Banco)

| Código | Significado |
|------|-------------|
| 02 | entrada confirmada |
| 06 | liquidação |
| 09 | baixa |
| 10 | título rejeitado |