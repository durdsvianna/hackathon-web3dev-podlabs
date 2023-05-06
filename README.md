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

## Testes Locais no Hardhat

- Pré-requisitos
    - Metamask configurada com nó Local Hardhat
    ```
    Network Name: Hardhat
    New RPC URL: http://127.0.0.1:8545/ — O ponto de acesso retornado ao rodar o nó local do hardhat
    Chain ID: 31337 —  ID Padrão do Hardhat, veja mais (aqui)[https://hardhat.org/hardhat-network/docs/reference]
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

8. Interaja com o contrato criando uma atividade através do Frontend

---

Dificuldades:
Visão de futuro:

## Licença

Distributed under the MIT License. See `LICENSE` for more information.

## Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/">
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
