# Login-Cadastro-Perfil_Node.js
Este é um projeto de **cadastro e login** desenvolvido com **Node.js**.  

O objetivo do projeto foi criar algo mais “complexo”, incluindo **cadastro/login** e também um **perfil de usuário**, permitindo que cada usuário tenha acesso a suas próprias informações.

Foram utilizadas as seguintes tecnologias e bibliotecas:  
**Express**, **Express-Handlebars**, **Body-Parser**, **Sequelize**, **SQLite3**, **Connect-Flash**, **Express-Session** e **Bcrypt**.

bibliotecas utilizadas

- Node.js  
- Express  
- Express-Handlebars  
- Body-Parser  
- Sequelize  
- SQLite3  
- Connect-Flash  
- Express-Session  
- Bcrypt
- Nodemon

Funcionalidades

- Cadastro de usuários com validação de dados com criptografia de senhas com o bcrypt
- Login de usuários com autenticação segura  
- Perfil do usuário com informações pessoais como nome e email
- Sessão de usuário com controle de login/logout  
- Feedback de erros ou sucesso utilizando mensagens flash

Para a incialização do projeto é preciso instalar as bibliotecas, no terminal inciar com *npm run dev* mas antes (tambpem mudar as configurações no package.json no “scripts“: { “dev“: “nodemon server.js“}).
E no navegador: localhost:3000
