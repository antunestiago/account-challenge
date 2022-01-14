Account Challenge
============

### Description

Este projeto é um serviço backend usando NodeJS, que recebe um arquivo de entrada no formato json para processar eventos - como descreve a arquitetura - abaixo e gera como saída um arquivo contendo os status e respostas de acordo com as entradas.

![Screenshot from 2022-01-13 20-57-43](https://user-images.githubusercontent.com/20117606/149427593-fbeada36-9d6e-4f9e-8614-e241da440775.png)

Algumas observações. 
 - Os dados são gravados em memória, então tenha em mente que sempre que rodar os dados serão perdidos.
 - O arquivo de saída não é limpo cada vez que o serviço é iniciado.
 - O arquivo de saída se não existir é criado na primeira vez que é enviado
 - Quando usar o postman, certifique-se do campo de upload de arquivo tenha o nome "upload" como mostra o gif.
 
### How to install
``` 
npm install
```

### How to run
``` 
npm start
```
