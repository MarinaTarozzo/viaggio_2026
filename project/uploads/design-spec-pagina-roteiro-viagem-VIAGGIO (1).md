# Design Spec — Página Online do Roteiro da Viagem

**Versão:** 02  
**Formato:** Markdown / Spec funcional e visual  
**Objetivo:** orientar a criação de uma página web responsiva, acessível e editável para uso familiar durante a viagem.

---

## 1. Contexto do produto

A página será um **roteiro online compartilhado da viagem**, usado por Ana Paula, Fernando, Mariana, Pedro e Marina para consultar rapidamente:

- roteiro por cidade;
- hotéis reservados;
- dias de estrada, tempo estimado e quilometragem;
- mapa da viagem;
- links importantes de Drive e planilhas;
- sugestões de passeios, restaurantes, lojas, vistas e experiências;
- votos e avaliações das experiências durante ou após a viagem.

A prioridade é que o site funcione muito bem no celular, seja fácil para pessoas idosas, tenha letras grandes, bom contraste e navegação objetiva.

---

## 2. Objetivo principal da página

Criar uma página online simples, bonita e funcional para que a família consiga:

1. **Conferir o roteiro planejado**
   - cidade;
   - hotel;
   - passeios;
   - deslocamentos;
   - datas;
   - tempo e distância de estrada.

2. **Acessar informações críticas rapidamente**
   - reservas de hotéis;
   - reserva do carro;
   - planilha do roteiro;
   - mapa do Google Maps.

3. **Colaborar durante a viagem**
   - adicionar sugestões de lugares;
   - votar nos passeios favoritos;
   - avaliar cidades, hotéis e passeios com estrelas;
   - buscar informações sem precisar navegar por muitas páginas.

---

## 3. Usuários

- Ana Paula
- Fernando
- Mariana
- Pedro
- Marina

### Necessidades dos usuários

- Ver o que vem a seguir na viagem.
- Encontrar hotel, endereço e status de pagamento.
- Saber quando haverá estrada e quanto tempo vai levar.
- Consultar o mapa da viagem.
- Sugerir lugares novos.
- Votar nos favoritos.
- Avaliar experiências depois de visitar.
- Usar tudo pelo celular, com leitura fácil.

---

## 4. Jobs to be Done

### JTBD 01 — Conferir a próxima parada

**Quando** eu estiver durante a viagem,  
**quero** abrir o site e entender rapidamente qual é a próxima cidade, hotel e passeio planejado,  
**para** não precisar procurar em planilhas ou mensagens soltas.

Hierarquia de exibição:

1. Cidade
2. Hotel
3. Passeios
4. Deslocamentos / estrada
5. Links úteis

---

### JTBD 02 — Acessar o mapa

**Quando** eu quiser entender o roteiro visualmente,  
**quero** ver o mapa da viagem na home,  
**para** localizar cidades, hotéis, passeios e deslocamentos.

Mapa de referência:  
https://maps.app.goo.gl/DRUELgQp6tvGzj7M8

---

### JTBD 03 — Conferir hotel reservado

**Quando** eu chegar ou estiver indo para uma cidade,  
**quero** ver um card com o hotel reservado, endereço e status de pagamento,  
**para** facilitar check-in, deslocamento e organização financeira.

Campos mínimos do card de hotel:

- Nome do hotel
- Cidade
- Endereço
- Status: pago / não pago / verificar
- Link da reserva, se houver
- Observações importantes
- Botão “Abrir no Google Maps”

Regra de dados: considerar apenas hotéis marcados como **Reserva = SIM** na aba “Cidades-Hoteis”.

---

### JTBD 04 — Conferir dia, data e estrada

**Quando** eu estiver consultando o roteiro,  
**quero** ver a data, o dia da viagem e a cidade correspondente,  
**para** entender rapidamente onde estaremos em cada dia.

Quando houver deslocamento, destacar:

- origem;
- destino;
- quilometragem;
- tempo previsto de estrada;
- observações de parada.

---

### JTBD 05 — Acessar documentos importantes

Criar uma área de links úteis com acesso rápido para:

- Pasta de reserva de hotéis  
  https://drive.google.com/drive/folders/1CFKamwdb4cwshhaIpAVAVjZdX6ie2MU-?usp=drive_link

- Reserva do carro  
  https://drive.google.com/drive/folders/1XnTDG0PT8e4hiy4U6McPEYLeRf5N_PwD?usp=drive_link

- Planilha com roteiro e hotéis  
  https://docs.google.com/spreadsheets/d/1R6gcvyeLMhkwDLGlAFunO8KiKChJKJq5RIbXh3UyMwQ/edit?usp=sharing

---

### JTBD 06 — Inserir sugestões

**Quando** alguém descobrir um lugar interessante,  
**quero** conseguir adicionar uma sugestão no site,  
**para** que todos possam ver, votar e decidir juntos.

Campos do formulário de sugestão:

- Nome do lugar
- Categoria
- Cidade vinculada
- Data sugerida, opcional
- Horário sugerido, opcional
- Link externo, opcional
- Motivo da sugestão, opcional
- Pessoa que adicionou
- Foto principal, se possível a partir do link do Google

Categorias iniciais:

- Restaurante
- Café / doce
- Museu
- Loja
- Vista bonita
- Experiência
- Passeio ao ar livre
- Parada de estrada
- Outro

---

### JTBD 07 — Votar nas sugestões

Cada sugestão deve permitir:

- voto individual por usuário;
- contador de votos;
- ordenação por mais votadas;
- filtro por cidade e categoria.

---

### JTBD 08 — Avaliar experiências

Permitir avaliação de 1 a 5 estrelas para:

- cidades;
- hotéis;
- passeios planejados;
- passeios sugeridos.

Campos opcionais de avaliação:

- nota de 1 a 5;
- comentário curto;
- pessoa que avaliou;
- data da avaliação.

---

### JTBD 09 — Buscar informações

A página deve ter busca global para encontrar:

- cidade;
- hotel;
- passeio;
- restaurante;
- sugestão;
- categoria;
- data;
- link útil.

A busca deve ficar visível no topo ou logo abaixo do header, principalmente no mobile.

---

## 5. Estrutura recomendada da experiência

### 5.1 Home

A home deve responder rapidamente:

- Onde estamos?
- Para onde vamos?
- Qual é o hotel?
- O que temos planejado?
- O que foi sugerido?
- O que está mais votado?
- Como abro o mapa?

#### Blocos da home

1. Header
2. Busca global
3. Card “Próxima parada”
4. Mapa incorporado
5. Linha do tempo da viagem
6. Sugestões mais votadas
7. Links úteis
8. Botão fixo “Adicionar sugestão”

---

### 5.2 Roteiro por cidade

Cada cidade deve ter uma seção própria.

Estrutura:

```text
Cidade
Data(s)
Resumo da estadia
Hotel reservado
Passeios planejados
Sugestões da família
Avaliação da cidade
```

---

### 5.3 Mapa

O mapa deve ser visível na home e ter filtros simples.

Filtros:

- Cidades
- Hotéis
- Passeios planejados
- Sugestões
- Estradas / deslocamentos
- Restaurantes
- Compras
- Vistas

No MVP, caso a integração total com mapa seja complexa, usar botão direto para abrir o Google Maps e uma imagem/iframe simples do mapa na home.

---

### 5.4 Sugestões

Tela ou seção com cards de sugestões.

Cada card deve mostrar:

- nome;
- categoria;
- cidade;
- quem adicionou;
- link externo;
- motivo;
- votos;
- avaliação, se já visitado;
- botão para abrir o link;
- botão para excluir, apenas para quem adicionou.

---

### 5.5 Links úteis

Seção simples com botões grandes:

- Reservas de hotéis
- Reserva do carro
- Planilha do roteiro
- Mapa da viagem

---

## 6. Priorização de funcionalidades

### MVP — Essencial para colocar no ar

Esta é a primeira versão recomendada para gastar menos créditos e conseguir publicar.

1. Home responsiva
2. Roteiro por cidade
3. Cards de hotéis
4. Links úteis
5. Mapa incorporado ou botão para Google Maps
6. Busca simples
7. Seção de sugestões
8. Voto simples nas sugestões
9. Avaliação por estrelas
10. Botão fixo para adicionar sugestão

### Versão 2 — Depois que o MVP estiver funcionando

1. Login por usuário
2. Permissão para excluir apenas a própria sugestão
3. Foto automática do lugar a partir de link do Google
4. Filtros avançados no mapa
5. Ranking pós-viagem
6. Integração mais robusta com banco de dados
7. Histórico de alterações
8. Comentários por sugestão

### Não priorizar na primeira versão

- Automação completa com Google Sheets
- Login complexo
- Permissões sofisticadas
- Mapa 100% dinâmico com múltiplas camadas
- Fotos automáticas via API paga
- Integrações que dependam de muitas chaves/API

---

## 7. Arquitetura de informação

```text
Home
├── Busca
├── Próxima parada
├── Mapa
├── Linha do tempo
│   ├── Cidade
│   ├── Hotel
│   ├── Passeios
│   └── Estrada
├── Sugestões
│   ├── Mais votadas
│   ├── Por cidade
│   └── Por categoria
├── Avaliações
└── Links úteis
```

---

## 8. Componentes de interface

### 8.1 Header

Inspirado em referências com estética editorial, linhas finas e layout horizontal.

Conteúdo:

- Logo/nome do roteiro à esquerda
- Links de navegação à direita

Sugestão de nome:

**VIAGGIO — roteiro da viagem**

Links:

- Roteiro
- Mapa
- Sugestões
- Links úteis

No mobile, transformar em menu simples ou botões empilhados.

---

### 8.2 Busca global

Campo grande, legível e sempre fácil de encontrar.

Placeholder:

```text
Buscar cidade, hotel, passeio ou restaurante
```

---

### 8.3 Card “Próxima parada”

Deve ser o card mais importante da home.

Conteúdo:

- Cidade atual ou próxima cidade
- Data
- Hotel
- Próximo passeio
- Se há estrada no dia
- Botão “Ver detalhes”
- Botão “Abrir mapa”

---

### 8.4 Card de cidade

Campos:

- Nome da cidade
- Datas
- Resumo
- Hotel
- Passeios planejados
- Sugestões vinculadas
- Avaliação média

---

### 8.5 Card de hotel

Campos:

- Nome
- Cidade
- Endereço
- Status de pagamento
- Link da reserva
- Observações
- Avaliação por estrelas
- Botão “Abrir no Maps”

---

### 8.6 Card de passeio planejado

Campos:

- Nome
- Cidade
- Data
- Horário
- Categoria
- Link externo
- Avaliação por estrelas

---

### 8.7 Card de sugestão

Campos:

- Nome
- Categoria
- Cidade
- Pessoa que sugeriu
- Link externo
- Motivo
- Votos
- Avaliação
- Botão “Votar”
- Botão “Abrir link”
- Botão “Excluir”, se for da própria pessoa

---

### 8.8 Botão flutuante

No mobile, manter botão fixo no rodapé:

```text
+ Sugerir lugar
```

---

## 9. Diretrizes visuais

### 9.1 Conceito visual

A identidade deve remeter a:

- verão italiano;
- viagem em família;
- editorial vintage;
- cores solares;
- mapa e roteiro;
- simplicidade;
- leitura fácil.

O visual deve combinar uma estética editorial com alta usabilidade.

---

### 9.2 Tokens globais

#### Cores

```css
--color-brand-primary: #D95A2B;      /* Laranja Solar */
--color-brand-secondary: #1A4B6E;    /* Azul Oceano */
--color-brand-background: #F7EAD3;   /* Areia Quente */
--color-brand-green: #46552A;        /* Verde Oliva complementar */
--color-surface: #FFF7E8;
--color-text: #1A4B6E;
--color-border: #1A4B6E;
--color-danger: #A63A2A;
```

Uso:

- Laranja Solar: ações principais, destaques e estados ativos.
- Azul Oceano: textos, títulos, ícones, bordas.
- Areia Quente: fundo principal.
- Verde Oliva: detalhes e variações visuais.
- Surface claro: cards e áreas internas.

---

### 9.3 Tipografia

#### Títulos principais

- Fonte: Chonburi
- Peso: Bold
- Uso: H1, H2, nomes de seções e chamadas principais

#### Corpo e interface

- Fonte: DM Sans
- Pesos: Regular e Medium
- Uso: parágrafos, botões, labels, cards e navegação

Fallbacks:

```css
font-family-title: "Chonburi", Georgia, serif;
font-family-body: "DM Sans", Arial, sans-serif;
```

---

### 9.4 Acessibilidade visual

Obrigatório:

- fonte mínima de 16px;
- textos importantes com 18px ou mais;
- botões grandes;
- contraste alto;
- área clicável mínima de 44px;
- evitar textos longos em cards pequenos;
- não depender apenas de cor para indicar status;
- usar labels claros: “Pago”, “Não pago”, “Verificar”.

---

### 9.5 Linhas estruturais

A estética deve usar linhas finas, sem depender de sombras.

```css
--border-structural: 1px solid #1A4B6E;
```

Regras:

- separar seções com bordas de 1px;
- usar grid editorial;
- evitar excesso de sombras;
- manter respiro interno mínimo de 24px.

---

## 10. Layout responsivo

### Mobile first

Como o uso principal será pelo smartphone, o layout deve ser desenhado primeiro para mobile.

#### Mobile

- 1 coluna;
- header compacto;
- botões grandes;
- busca visível;
- cards empilhados;
- mapa em altura reduzida;
- botão flutuante no rodapé.

#### Desktop

- grid de 2 colunas;
- mapa ao lado do resumo;
- linha do tempo mais aberta;
- cards em grade.

---

## 11. Regras de conteúdo

### Tom de voz

- familiar;
- claro;
- direto;
- organizado;
- sem linguagem técnica.

Exemplos de microcopy:

- “Próxima parada”
- “Hoje tem estrada”
- “Abrir reserva”
- “Sugerir lugar”
- “Mais votados pela família”
- “Avaliar depois da visita”
- “Ver no mapa”

---

## 12. Modelo de dados recomendado

### Cidade

```json
{
  "id": "milao",
  "nome": "Milão",
  "dataInicio": "YYYY-MM-DD",
  "dataFim": "YYYY-MM-DD",
  "resumo": "",
  "avaliacoes": []
}
```

### Hotel

```json
{
  "id": "hotel-milao-01",
  "cidadeId": "milao",
  "nome": "",
  "endereco": "",
  "reserva": true,
  "statusPagamento": "pago | nao_pago | verificar",
  "linkReserva": "",
  "observacoes": "",
  "avaliacoes": []
}
```

### Deslocamento

```json
{
  "id": "milao-lago",
  "data": "YYYY-MM-DD",
  "origem": "",
  "destino": "",
  "distanciaKm": "",
  "tempoPrevisto": "",
  "observacoes": ""
}
```

### Passeio planejado

```json
{
  "id": "passeio-01",
  "cidadeId": "",
  "nome": "",
  "categoria": "",
  "data": "",
  "horario": "",
  "link": "",
  "avaliacoes": []
}
```

### Sugestão

```json
{
  "id": "sugestao-01",
  "nome": "",
  "categoria": "",
  "cidadeId": "",
  "dataSugerida": "",
  "horarioSugerido": "",
  "link": "",
  "motivo": "",
  "criadoPor": "",
  "votos": [],
  "avaliacoes": []
}
```

---

## 13. Regras funcionais

### Sugestões

- Qualquer usuário pode criar sugestão.
- A sugestão deve estar vinculada a uma cidade.
- Data e horário são opcionais.
- Link externo é opcional.
- Motivo é opcional.
- Apenas sugestões podem ser excluídas.
- Cidade, hotel e roteiro base não devem ser excluídos pela interface comum.

### Votos

- Cada pessoa pode votar uma vez por sugestão.
- O sistema deve mostrar total de votos.
- Deve ser possível ordenar por mais votadas.

### Avaliações

- Avaliação de 1 a 5 estrelas.
- Aplicável a cidade, hotel e passeio.
- Comentário opcional.
- Mostrar média quando houver mais de uma avaliação.

### Busca

A busca deve procurar em:

- nome da cidade;
- nome do hotel;
- nome do passeio;
- categoria;
- pessoa que sugeriu;
- observações;
- links úteis.

---

## 14. Stack recomendada para colocar no ar com pouco código

Como a usuária é designer, não conhece código e precisa colocar o site em pé gastando poucos créditos, a recomendação é:

### Caminho recomendado

1. Criar primeiro um protótipo funcional no Claude Design ou ferramenta visual semelhante.
2. Validar rapidamente:
   - estrutura da home;
   - leitura no celular;
   - hierarquia das informações;
   - cards de roteiro;
   - formulário de sugestão;
   - visual geral.
3. Só depois pedir para transformar em código.
4. Começar com dados estáticos ou semi-estáticos.
5. Adicionar banco de dados apenas quando o layout e o fluxo estiverem aprovados.

### Por quê

Se partir direto para código, há risco de gastar créditos ajustando coisas visuais e estruturais que uma designer consegue avaliar melhor em protótipo. O código deve vir depois que a ideia estiver mais fechada.

---

## 15. Escopo técnico recomendado para MVP

### Opção mais econômica

- Página estática em HTML/CSS/JS ou React simples.
- Dados iniciais em arquivo JSON.
- Sugestões podem começar em uma solução simples:
  - formulário conectado ao Google Forms;
  - ou banco simples como Supabase/Firebase;
  - ou uma planilha Google como base, se a ferramenta suportar.

### Para primeira publicação

Priorizar:

- site responsivo;
- conteúdo do roteiro;
- links úteis;
- mapa;
- visual bonito;
- busca simples;
- botão para registrar sugestão.

Depois evoluir para:

- votos;
- avaliações;
- edição;
- exclusão por usuário;
- fotos automáticas;
- mapa filtrável.

---

## 16. Prompt recomendado para gerar o protótipo no Claude Design

```text
Crie um protótipo mobile-first de uma página web chamada “VIAGGIO — roteiro da viagem”.

Contexto:
Será uma página online compartilhada por uma família durante uma viagem. Os usuários são Ana Paula, Fernando, Mariana, Pedro e Marina. A página deve permitir consultar roteiro por cidade, hotéis, passeios, dias de estrada, mapa da viagem, links úteis, sugestões de passeios, votos e avaliações.

Objetivo:
Criar uma home responsiva e muito fácil de usar no celular, com alta acessibilidade, letras grandes, contraste alto e botões grandes.

Estrutura da home:
1. Header com nome “VIAGGIO” e navegação: Roteiro, Mapa, Sugestões, Links.
2. Campo de busca global.
3. Card principal “Próxima parada”, mostrando cidade, data, hotel, próximo passeio e se há estrada.
4. Mapa incorporado ou bloco visual de mapa com botão “Abrir Google Maps”.
5. Linha do tempo da viagem por cidade.
6. Cards de hotéis reservados.
7. Seção “Sugestões da família”, com cards votáveis.
8. Seção “Mais votados”.
9. Links úteis.
10. Botão flutuante no mobile: “+ Sugerir lugar”.

Funcionalidades simuladas no protótipo:
- adicionar sugestão;
- votar em sugestão;
- avaliar cidade, hotel e passeio com 1 a 5 estrelas;
- buscar por cidade, hotel ou passeio;
- filtrar sugestões por cidade e categoria.

Visual:
Usar estética de verão italiano, editorial vintage e brutalista leve, com linhas finas e sem muitas sombras.

Tokens visuais:
- Laranja Solar: #D95A2B
- Azul Oceano: #1A4B6E
- Areia Quente: #F7EAD3
- Verde Oliva complementar: #46552A
- Fonte de título: Chonburi
- Fonte de corpo: DM Sans
- Bordas estruturais: 1px solid #1A4B6E
- Botões em formato pílula, com borda azul e hover laranja.

Acessibilidade:
- fonte mínima 16px;
- textos importantes 18px ou mais;
- botões com altura mínima de 44px;
- contraste alto;
- navegação simples para pessoas idosas.

Entregue o protótipo em uma única página, priorizando mobile, com layout bonito e pronto para depois virar código.
```

---

## 17. Prompt recomendado para transformar em código depois

```text
Transforme o protótipo aprovado em um site funcional, responsivo e publicável.

Requisitos:
- Criar uma aplicação React simples, mobile-first.
- Usar HTML semântico e CSS organizado.
- Usar os tokens visuais definidos:
  - #D95A2B
  - #1A4B6E
  - #F7EAD3
  - #46552A
  - Chonburi para títulos
  - DM Sans para corpo
- Criar componentes:
  - Header
  - SearchBar
  - NextStopCard
  - MapSection
  - Timeline
  - CityCard
  - HotelCard
  - SuggestionCard
  - UsefulLinks
  - RatingStars
  - AddSuggestionForm
- Manter dados iniciais em um arquivo JSON.
- Permitir:
  - buscar;
  - filtrar;
  - votar;
  - avaliar com estrelas;
  - adicionar sugestão localmente.
- Nesta primeira versão, não criar login complexo.
- Preparar o código para futura integração com Supabase ou Firebase.
- Garantir excelente experiência no celular.
```

---

## 18. Critérios de aceite

A primeira versão estará boa quando:

- a página abrir bem no celular;
- uma pessoa idosa conseguir ler e clicar sem dificuldade;
- a família encontrar rapidamente cidade, hotel, mapa e links;
- o roteiro estiver claro por data e cidade;
- as sugestões forem fáceis de adicionar;
- os votos estiverem fáceis de entender;
- a estética estiver coerente com verão italiano;
- o site puder ser publicado sem depender de muitas integrações complexas.

---

## 19. Recomendação final

Não comece direto pelo código.

A melhor estratégia é:

1. **Claude Design primeiro**, para validar layout e experiência gastando menos.
2. **Protótipo aprovado**, com estrutura visual e fluxo definidos.
3. **Código depois**, pedindo uma versão MVP simples, com o mínimo de integrações.
4. **Publicação rápida**, mesmo que a primeira versão ainda tenha dados estáticos.
5. **Evolução incremental**, adicionando votos, avaliações e banco de dados quando a base estiver funcionando.

Para o seu cenário — designer, sem familiaridade com código, poucos créditos e necessidade de colocar o site no ar — o caminho mais seguro é prototipar primeiro e codar depois.
