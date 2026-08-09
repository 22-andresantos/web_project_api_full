# Around — Full Stack

Projeto full stack desenvolvido durante o curso de Desenvolvimento Web da TripleTen.

A aplicação permite que usuários criem uma conta, façam login e interajam com cartões de lugares, incluindo criação, exclusão e curtidas, além da edição das informações do perfil e avatar.

## 🌐 Projeto online

https://andrearound.duckdns.org

## 🚀 Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Autorização através de JWT
- Proteção de rotas privadas
- Visualização de cartões
- Adição de novos cartões
- Exclusão de cartões
- Curtir e descurtir cartões
- Edição do nome e descrição do perfil
- Alteração do avatar
- Validação de dados
- Tratamento de erros
- Interface responsiva para diferentes tamanhos de tela

## 🛠️ Tecnologias e ferramentas

### Front-end

- React
- React DOM
- React Router
- JavaScript
- HTML5
- CSS3
- Vite

### Back-end

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Celebrate/Joi para validação
- Winston para logs

### Deploy e infraestrutura

- Linux / Ubuntu
- Nginx
- PM2
- HTTPS / SSL
- DuckDNS

### Controle de versão

- Git
- GitHub

🔐 Autenticação

A aplicação utiliza autenticação baseada em JWT.

Após o login, o token é armazenado no navegador e utilizado para acessar as rotas protegidas da API.

As rotas públicas incluem:

POST /signup
POST /signin

As demais operações da API exigem autenticação.

🗄️ Banco de dados

O projeto utiliza MongoDB para armazenamento dos dados de usuários e cartões.

A comunicação com o banco é realizada através do Mongoose.

🔒 Segurança

Foram implementados:

Autenticação JWT
Proteção de rotas
Validação dos dados recebidos pela API
Tratamento de erros
HTTPS
Configuração de CORS
Variáveis de ambiente para informações de configuração
⚙️ Execução local
Backend
cd backend
npm install
npm run start
Frontend
cd frontend
npm install
npm run dev

Para gerar a versão de produção do frontend:

npm run build
🔄 Gerenciamento do servidor

O backend é executado com PM2, permitindo que o processo seja reiniciado automaticamente caso o servidor apresente uma falha.

O Nginx atua como servidor web e proxy reverso, permitindo o acesso à aplicação através de HTTPS.

📱 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela, incluindo dispositivos desktop e mobile.

👨‍💻 Autor

André Santos

Projeto desenvolvido como parte da formação em Desenvolvimento Web da TripleTen.
