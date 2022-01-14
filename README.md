Account Challenge
============

### Descrição

Este projeto é um serviço backend usando NodeJS, que recebe um arquivo de entrada no formato json para processar eventos - como descreve a arquitetura - abaixo e gera como saída um arquivo contendo os status e respostas de acordo com as entradas.

Endpoint para fazer upload de arquivo: /eventsupload

![Screenshot from 2022-01-13 20-57-43](https://user-images.githubusercontent.com/20117606/149427593-fbeada36-9d6e-4f9e-8614-e241da440775.png)

Algumas observações. 
 - Os dados são gravados em memória, então tenha em mente que sempre que rodar os dados serão perdidos.
 - O arquivo de saída não é limpo cada vez que o serviço é iniciado.
 - O arquivo de saída se não existir é criado na primeira vez que é enviado
 - Quando usar o postman, certifique-se do campo de upload de arquivo tenha o nome "upload" como mostra o gif.
 - O serviço esta subindo na porta 4005
 - O arquivo de entrada deve conter um json válido, o objeto deve estar em um array. Tem um exemplo mais abaixo.
 
### Instalação
``` 
npm install
```

### Iniciar o serviço
``` 
npm start
```

### Como utilizar
Após iniciar, abrir o postman ou um API Client de sua preferência, criar uma nova request do tipo POST para o endpoint /eventsupload. 
Exemplo: http://localhost:4005/eventsupload.

No body, criar um form e criar um campo do tipo arquivo. Veja a imagem abaixo:

![Screenshot from 2022-01-13 21-29-32](https://user-images.githubusercontent.com/20117606/149430459-0d1d72e3-8027-4f3b-b1df-78e599680916.png)

Faz o upload do arquivo de entrada, exemplo de entrada.

```
[{"type": "initialize_account", "payload": {"name": "Joana Bárbara Caldeira", "document": "999.999.999-99", "available-limit": 1000}},
{"type": "initialize_account", "payload": {"name": "Andreia Cecília Rocha", "document": "111.111.111-11", "available-limit": 500}},
{"type": "transaction", "payload": {"sender-document": "999.999.999-99", "receiver-document": "111.111.111-11", "value": 300, "datetime": "2021-08-12T14:30:30Z"}},
{"type": "transaction", "payload": {"sender-document": "999.999.999-99", "receiver-document": "111.111.111-11", "value": 150, "datetime": "2021-08-12T14:32:08Z"}},
{"type": "transaction", "payload": {"sender-document": "111.111.111-11", "receiver-document": "999.999.999-99", "value": 20, "datetime": "2021-08-12T14:33:00Z"}},
{"type": "transaction_history", "payload": {"document": "111.111.111-11"}},
{"type": "transaction_history", "payload": {"document": "999.999.999-99"}}]
```

Após isso o próximo passo é executar a request e um  arquivo chamado output.json será gerado.

Gif de exemplo:

![exemplo](https://user-images.githubusercontent.com/20117606/149432429-7f8cf8b1-119b-4a4d-adf8-312abe927fae.gif)
