#### Edital do Hackathon: https://docs.web3dev.com.br/pods/hackathon-pod-labs/edital-geral
#### Edital dos Temas e Premiações: https://docs.web3dev.com.br/pods/hackathon-pod-labs/edital-dos-temas

```
Nome da equipe: unidosdoethsamba

Nome dos integrantes: Daniel Vianna & Heron Lancellot

Grants aplicados:
UX/UI Design (R$700)

1. Melhor layout geral (R$400).
2. Melhores componentes e botões animados (R$180).
3. Melhores ícones, paletas, imagens e tipografia (R$120).

Front-end (R$1000):

4. Melhor código de front-end do Marketplace de Atividades (R$1000).

Solidity (js/ts) (R$1300):

5. Melhor fluxograma do “Marketplace de Atividades” (R$150).

6. Melhor script/interface para fazer upload de metadados no IPFS (R$75).

7. Melhor script/interface de criação de especificações de metadados (NFTs das atividades) (R$75).

8. Melhor contrato inteligênte e atendimento às funcionalidades propostas (R$1000):

```

```
Nome do projeto:  Web3Dev Admin Activities Dashboard
Pitch:
```
## Arquitetura do sistema
![Arquitetura Do Sistema](https://ipfs.io/ipfs/QmUYos9SV1mYio2yffp4t3JUdbn77L66mwijAKyH41VQbj?filename=NFT%20Web3Dev.png)

## Tecnologias

Esse projeto foi desenvolvido usando as seguintes tecnologias:

- React
- TypeScript
- Node Js
- Pinata
- Solidity
- Hardhat
- Mui
- Wagmi
- Ethers.js
---

Descrição do produto:

Como testar/compilar o produto:

## Rodar Aplicação

Para testar/compilar é necessário ter o Node Js instalado na máquina.

Pré-requisito Instalação:

- Node Js
- IPFS Desktop

### Variáveis de ambiente

É necessário setar as seguintes variávei de ambiente no sistema:

## Frontend
- Crie um arquivo .env em frontend

```
REACT_APP_INFURA_PROJECT_ID="<senha>"
REACT_APP_INFURA_API_KEY_SECRET="<senha>"
REACT_APP_IPFS_GATEWAY="http://127.0.0.1:8080" 
REACT_APP_PINATA_AUTH="Bearer <senha>"
REACT_APP_PINATA_API_KEY="<senha>"
REACT_APP_PINATA_API_SECRET"<senha>"
REACT_APP_ERC721_METADATA_EXTERNAL_LINK="'https://github.com/seu-profile"
REACT_APP_DAPP_CONTRACT="0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
```

## Interagindo com o Marketplace


- Pré-requisitos
    - Metamask configurada com nó Local Hardhat
    ```
    Network Name: Hardhat
    New RPC URL: http://127.0.0.1:8545/ — O ponto de acesso retornado ao rodar o nó local do hardhat
    Chain ID: 31337 —  ID Padrão do Hardhat, veja mais [https://hardhat.org/hardhat-network/docs/reference]
    Currency Symbol: HardhatETH — Defina um simbolo que irá aparecer no seu LocalHost do Hardhat
    ```
1. Entre na pasta frontend

```
    cd frontend
```

2. Inicialize a aplicação

```
    npm run start
```

3. Entre na pasta de contracts/

```
    cd contracts
```

4. Inicialize o Nó Local do Hardhat

```
    npx hardhat node
```

5. Depois, execute o comando:

```
    npm run deploy
```

6. Configure o .env (REACT_APP_DAPP_CONTRACT)
```
REACT_APP_DAPP_CONTRACT = <Coloque o endereço do Contrato aqui>
```

7. Envie faucet para seu endereço:
```
  npx hardhat --network localhost faucet <Coloque seu endereço aqui>  
```

8. Interaja com o contrato criando uma atividade através do Frontend e queimando e alterando a ROLE nos scripts

## Importante !
```
Para a aplicação funcionar é necessário alterar a ROLE em deployment/deployNftERC721.js com o seu endereço, recomendável ter duas contas para experiência de ser LEADER e MEMBER na comunidade Web3Dev
Exemplo:    
await erc721.grantRole(LEADER_ROLE, "<Coloque seu Endereço aqui>")

Agora envie o Faucet para esse endereço, Lembrando que apenas o LEADER consegue realizar o MINT e o BURN do NFT.

O IPFS Desktop é importante para renderizar suas NFTs na aplicação

```
---

## Testes Locais no Hardhat
Rode esse comando em contracts/ 
``` 
npx hardhat test
```


```
Dificuldades:

Dificuldade maior foi em conseguir utilizar a biblioteca wagmi para realizar as interações com o contrato. 
O multi-sig acabou que não conseguimos nos dedicar o tanto quanto queríamos, pois ficamos muito tempo com problemas relativamente básicos de load de páginas com o React Hooks.
Visão de futuro:

Visão de Futuro:

Ajustar o loas da pagina principal com os cards do marketplace.
Acredito que após essa experiencia, para o futuro nos cabe finalizar o desenvolvimento do multi-sig e então validar o processo de aprovação da conclusão das atividades pelos lideres. 
Implementar a transação de compra da atividade pelo membro.

```
## Licença

Distributed under the MIT License. See `LICENSE` for more information.

## Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/daniel-vianna-431a0932/">
        <img src="https://avatars.githubusercontent.com/u/19876786?v=4" width="100px;" alt="Daniel Vianna"/><br>
        <sub>
          <b>Daniel Vianna</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/heron-lancellot">
        <img src="https://avatars.githubusercontent.com/u/57544272?v=4" width="100px;" alt="Heron Lancellot"/><br>
        <sub>
          <b>Heron Lancellot</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
