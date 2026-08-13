**Atividade 01 — Estudo Dirigido: Anatomia do Módulo de Notificações** 

**UC:** Testes de Software (TSOF) | **Data:** 13/08/2026 | **Modalidade:** em grupo **Tempo:** 35 minutos | **Avaliação:** formativa (CT 1 | CS 1, 2\) 

**Por que esta atividade existe** 

Você não consegue decidir **como testar** um sistema que você não sabe **como é feito por dentro**. 

Antes de escolher técnicas, escrever casos de teste ou configurar ambiente, é preciso responder a uma pergunta simples: *o que exatamente existe dentro deste módulo, e o que depende do quê?* É isso que vocês vão fazer agora — e o resultado será insumo direto das próximas três aulas. 

**O que entregar** 

Um arquivo **docs/analise-arquitetura.md** commitado no repositório do módulo de Notificações do grupo, **até o final da aula de hoje**. 

**Sem commit, sem entrega.** Coloquem o nome de todos os integrantes no topo do arquivo. 

**Se o grupo não conseguir acessar o repositório:** avisem o professor imediatamente, no início da atividade. Não fiquem 20 minutos travados nisso. 

**Parte 1 — Inventário da arquitetura (10 min)** Abram o repositório e percorram a estrutura de pastas. Preencham:

| Camada                    | Arquivos encontrados                     |        Responsabilidade (em uma frase)
                                                                       
| ------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Rotas                     | routes/auth.routes.js ,  notificacao.routes.js ,  evento.routes.js ,  participante.routes.js | Mapear caminho \+ verbo  HTTP para um controller;  aplicar middlewares |
| Controllers               | \-                                                                                           | \-                                                                     |
| Services                  | \-                                                                                           | \-                                                                     |
| Models                    | \-                                                                                           | \-                                                                     |
| Middlewares               | \-                                                                                           | \-                                                                     |
| Configuração / .env       | \-                                                                                           | \-                                                                     |
| Outros (utils,  helpers…) | \-                                                                                           | \-                                                                     |

**Depois, respondam:** 

1\. Quantos arquivos existem em cada camada? 

2\. As responsabilidades estão de fato separadas, ou existe camada fazendo o trabalho de outra? (Ex.: controller acessando o model direto, sem passar por service.) 

3\. Onde está a comunicação com o **banco de dados**? 

4\. Onde está a comunicação com o **serviço de e-mail** (Nodemailer/MailPit)? 

**Se a resposta de 2 for "está tudo misturado":** ótimo, registrem isso. Não é motivo de vergonha — é uma informação técnica valiosa, e ela vai fazer diferença no plano de testes de 27/08. 

**Parte 2 — Mapa das rotas (12 min)** 

Listem **todas** as rotas da API. Uma linha por rota:

|  \#   | Método | Caminho     | Exige  token? | Controller | Service | Model(s) | Efeito  colateral |
| :---: | ------ | ----------- | ------------- | ---------- | ------- | -------- | ----------------- |
|   1   | POST   | /auth/login | Não           | \-         | \-      | \-       | gera token        |
|   2   | \-     | \-          | \-            | \-         | \-      | \-       | \-                |
|   3   | \-     | \-          | \-            | \-         | \-      | \-       | \-                |

**Legenda de "efeito colateral":** o que essa rota muda no mundo além de devolver uma resposta — grava no banco, envia e-mail, gera token, apaga registro. Rota que só lê e devolve tem efeito colateral **nenhum**. 

**Dica:** comecem pelo arquivo de rotas e sigam o caminho. Cada rota aponta para um controller; cada controller chama alguma coisa. Sigam a linha até o banco. 

**Parte 3 — Que nível de teste cabe onde? (10 min)** 

Escolham **5 comportamentos** do módulo de vocês — pelo menos um de cada área: autenticação, notificações, eventos e participantes. 

Para cada um, classifiquem o nível de teste mais adequado e **justifiquem**: 

| \#  | Comportamento a verificar | Nível | Por que este nível |
| --- | ------------------------- | ----- | ------------------ |
| 1   | \-                        | \-    | \-                 |
| 2   | \-                        | \-    | \-                 |
| 3   | \-                        | \-    | \-                 |
| 4   | \-                        | \-    | \-                 |
| 5   | \-                        | \-    | \-                 |

**Níveis disponíveis:** unitário · integração · endpoint (sistema) · aceitação **Critério de decisão — use este roteiro:**  
A verificação envolve HTTP (status code, corpo da resposta, header)? → SIM: endpoint 

→ NÃO: continue 

A verificação precisa que o dado realmente chegue ao banco? 

→ SIM: integração 

→ NÃO: continue 

É uma regra de negócio pura, que roda só com os dados que você passa? → SIM: unitário 

**Exemplo preenchido, para vocês se guiarem:** 

|  \#   | Comportamento a  verificar            |  Nível   | Por que este nível                                                                    |
| :---: | ------------------------------------- | :------: | ------------------------------------------------------------------------------------- |
|   0   | Login com senha incorreta devolve 401 | endpoint | A verificação é sobre o código de status HTTP — só existe pela porta da frente da API |

**Parte 4 — Análise (5 min)** 

Respondam em texto corrido, no mesmo arquivo. Uma resposta por pergunta, com justificativa. 

**4.1** Se **uma única** funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê? 

**4.2** Quais pontos do módulo dependem de algo **externo** ao código de vocês (banco, servidor de e mail, relógio do sistema, variáveis de ambiente)? Listem todos. 

**4.3** Escolham **uma função ou método** que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede. Copiem o nome e o arquivo. *(Essa vai ser, provavelmente, a primeira coisa que vocês vão testar em 03/09.)* 

**4.4** Existe alguma parte do módulo que vocês **não sabem explicar** o que faz? Registrem qual. Não é demérito — é a primeira coisa que um responsável por qualidade precisa mapear ao assumir um sistema.  
**Parte 5 — Desafio extra (se sobrar tempo)** 

Olhando o mapa de rotas da Parte 2: qual rota vocês classificariam como a de **maior risco** e qual como a de **menor risco**? 

Justifiquem usando duas dimensões separadas: 

**Probabilidade** de conter um defeito (é complexa? mexe em muitas tabelas? foi feita às pressas?) 

**Impacto** se falhar (quantos usuários afeta? dá para desfazer? perde dado?) 

Isso é uma prévia da **análise de risco** que vocês vão fazer formalmente na aula de 27/08. 

**Checklist antes de encerrar** 

Nomes de todos os integrantes no topo do arquivo 

Parte 1 — tabela de camadas preenchida \+ 4 respostas 

Parte 2 — **todas** as rotas listadas (não só as principais) 

Parte 3 — 5 comportamentos classificados **com justificativa** 

Parte 4 — 4 respostas em texto 

Arquivo salvo como docs/analise-arquitetura.md 

**Commit feito e enviado (push)** 

**Ticket de saída — individual** 

Entregue no papel, antes de sair da sala: 

1\. Com suas palavras: qual a diferença entre **defeito** e **falha**? 

2\. Dê um exemplo de teste **não funcional** que faria sentido no módulo do seu grupo. 3\. Se o teste " POST /notificacoes retorna 201" **falhar**, o que esse resultado te diz — e o que ele **não** te diz?