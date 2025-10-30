Clone o projeto para uma pasta local
git clone https://github.com/lucasviola1/JogoDaVelha.git

Com a IDE de sua preferencia aberta abra o terminal e rode os respectivos comandos

Backend (.NET 9)

cd api
dotnet restore
dotnet run

API: https://localhost:5281

Frontend (Angular)

cd front
npm i
ng s

Frontend: http://localhost:4200

Configuração do Banco de Dados (PostgreSQL)

1. Configurar Connection String
No arquivo appsettings.json da API, altere a connection string:

{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=jogodavelha;Username=seu_usuario;Password=sua_senha"
  }
}

2. Instalar PostgreSQL Provider

cd api
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

3. Executar Migrations

# O arquivo de migration necessario ja foi criado apenas aplicar migration no banco
dotnet ef database update

Acesse: http://localhost:4200 após executar ambos os projetos.