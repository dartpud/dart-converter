
# Dart Converter

 [Para ver a demo clique aqui](https://dartpud.github.io/dart-converter/sign-in)\
 Para testes pode utilizar o usuário a seguir ou criar um na página inicial: 
 - dart.digital
 - 123


### Introdução

Olá, esse projeto foi criado com a intenção de simular um cenário real de conversão entre um projeto angular para reactJS.\
O projeto Dart Converter simula um crud simples de usuário com os campos de usuário/senha e um modelo de autenticação via JWT.

### O que deve ser feito?

Deve ser criado um projeto em react usando o layout/arquitetura de sua preferência, porém que não fuja do objetivo do site original.\
Caso não consiga fazer a edição/criação em table como no exemplo, pode ser criado páginas/rotas específicas para criação/edição de usuário.

## API

Para comunicar com a maioria das APIs é necessário informar um token de autenticação obtido no login ([Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/)), caso o token seja inválido ou expirado será retorando 401.\
Em todas as chamadas é necessário informar o id_application, um [GUID](https://techlib.wiki/definition/guid.html) específico que foi gerado para seu projeto.

### Métodos
Requisições para a API devem seguir os padrões:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações de um ou mais registros. |
| `POST` | Utilizado para criar um novo registro. |
| `PUT` | Atualiza dados de um registro. |
| `DELETE` | Remove um registro. |


### Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso.|
| `201` | Requisição executada com sucesso.|
| `204` | Requisição executada com sucesso.|
| `401` | Token/login inválido.|
| `404` | Endpoint não encontrado.|
| `412` | Erros de validação.|

### Endpoints
https://dart-converter-api.azurewebsites.net/api

#### User
https://dart-converter-api.azurewebsites.net/api/user

##### Buscar todos usuários por aplicação: 
- `GET` https://dart-converter-api.azurewebsites.net/api/user/{idApplication}
- Token de Autorização necessário
- Retorno: `UserModel[]`

##### Buscar usuário por id e aplicação: 
- `GET`https://dart-converter-api.azurewebsites.net/api/user/{idUser}/{idApplication}
- Token de Autorização necessário
- Retorno: `UserModel`

##### Criar usuário: 
- `POST` https://dart-converter-api.azurewebsites.net/api/user
- Request: `UserRequestModel`
- Response: `UserModel`

##### Editar usuário:
- `PUT` https://dart-converter-api.azurewebsites.net/api/user
- Token de Autorização necessário
- Request: `UserRequestModel`
- Response: `UserModel`

##### Excluir usuário:
- `DELETE` https://dart-converter-api.azurewebsites.net/api/user/{idUser}/{idApplication}
- Token de Autorização necessário
- Response: `201`

#### Auth
https://dart-converter-api.azurewebsites.net/api/auth

##### Obter Token de Autorização: 
- `POST` https://dart-converter-api.azurewebsites.net/api/auth/token
- Request: `TokenRequest`
- Response: `TokenResponse`

### Models

#### UserRequestModel
```
{
    "id_user": number, // opcional: deve ser enviado somente na edição
    "username": string, // obrigatório
    "password": string, // obrigatório na criação para edição se enviar null não será alterada a senha antiga
    "id_application": GUID // obrigatório
}
```

#### UserModel
```
{
    "id_user": number, // será sempre retornado com valor
    "username": string, // será sempre retornado com valor
    "password": string, // será sempre retornado com valor criptografado
    "id_application": GUID // será sempre retornado com valor
}
```

#### TokenRequest
```
{
    "username": string, // obrigatgório,
    "password": string, // obrigatório (senha descriptografada),
    "id_application": GUID // obrigatório
}
```

#### TokenResponse
```
{
    "user": UserModel, // será sempre retornado
    "access_token": // token de autenticação que deve ser enviado no header
}
```

##### Exemplo de como o token deve ser enviado no header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IiIsImp0aSI6IjQwMDdkYWNkOWMzYzQ1MGRiZWQwMGYwM2YzNmU0MTQwIiwiVXNlcm5hbWUiOiJkYXJ0LmRpZ2l0YWwiLCJJZFVzZXIiOiIxIiwiSWRBcHBsaWNhdGlvbiI6ImFjNDczOGZhLWY0NWQtNDg5Zi05NDczLWYxMDM2OTcyNTI4OSIsIm5iZiI6MTY2OTA4NDg3MiwiZXhwIjoxNjY5MzQ0MDcyLCJpYXQiOjE2NjkwODQ4NzIsImlzcyI6ImIxZDUxYzQyIiwiYXVkIjoiZjZkZGRkNjQ1MDI0In0.nf96HzEbGNmvGLdka4fShnmPH1Qo4It75UorDonEFeU
```

## Finalizei a conversão, e agora?

Após a finalização o projeto deve ser hospedado no github e o link do repositório compartilhado para que possamos validar.\
Não é necessário publicar o site porém o projeto deve estar funcional para que possamos baixá-lo e executá-lo localmente.\
Após isso entraremos em contato com o feedback :)

[Dart Digital](https://www.dartdigital.com.br/)