const express = require('express');
const users = require('./users.js');
const app = express();
const Joi = require('joi');
//instalou o nodemon tb
// const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));

app.get('/api/users', (req, res) => res.send(users));

app.get('/api/users/:id', (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id));
  if (!foundUser) {
    return res.status(404).send('Deu merda');
  }

  res.send(foundUser);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };

  users.push(newUser);
  res.send(newUser);
});

app.put('caminho_para_atualizar_um_usuário', (req, res) => {
  // Procure o usuário a partir do id
  const foundUser = users.find(user => user.id === parseInt(req.params.id));

  // Se não for encontrado, emita um erro que condiz e uma mensagem
  if (!foundUser) {
    return res.status(404).send('Deu merda');
  }

  //acima o erro é not found

  const schema = {
    name: Joi.string().min(3).required,
    email: Joi.string().min(3).required,
  }

  const validation = Joi.validate(req.body, schema)
  if(validation.error) {
    return res.status(400).send(validation.error.details[0].message)
  }
  //o erro acima é bad request
  //se nao tiver nada no req body name ou req body email não tiver nada, vai aparecer um erro 400 com a mensagem acima

  foundUser.name = req.body.name
  foundUser.email = req.body.email
  //quando estiver no postman, vai retornar na response um id para o novo usuário

  // Se for encontrado, faça a validação dos campos obrigatórios
  res.send(foundUser);
  
  
  // Se estiver inválido, retorne um status que condiz e uma mensagem
  // Se for válido, atualize o usuário encontrado a partir do id com os parâmetros recebidos
  // Retorne o usuário atualizado
});

app.delete('/api/users/:id', (req, res) => {
  //precisa de um id pra fazer request delete, quer deletar um específico
  
});

const schema = {
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
}
const validation = Joi.validate(params, schema);

if (validation.error) {
  throw new PostitError(validation.error.details[0].message, 404);
}

app.listen(3000, () => console.log('Ouvindo na porta 3000...'));
