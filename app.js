require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express'); // Importa o framework Express
const cookieParser = require('cookie-parser'); // Importa o Cookie Parser
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const Escritorio = require('./src/models/Escritorio');
const NivelDeAcesso = require('./src/models/NivelDeAcesso');
const Permissoes = require('./src/models/Permissoes');
const TipoDeUsuario = require('./src/models/TipoDeUsuario');
const TiposUsuariosPermissoes = require('./src/models/TiposUsuariosPermissoes');
const Sessao = require('./src/models/Sessao');
const Usuarios = require('./src/models/Usuarios');

// Configuração do Express...
const app = express(); // Inicializa uma aplicação Express


// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configura o motor de visualização para EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));


app.use(express.json()); // Middleware para parsing de JSON no corpo das requisições
app.use(cookieParser()); // Middleware para parsing de Cookie

app.use(bodyParser.urlencoded({ extended: true }));

// Importa os arquivos de rota
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas de auth
const adminRoutes = require('./src/routes/adminRoutes'); // Importa as rotas de admin
const officeRoutes = require('./src/routes/officeRoutes'); // Importa as rotas de admin

// Define as rotas de administração com autenticação
app.use('/', authRoutes)
app.use('/admin', adminRoutes);
app.use('/escritorio', officeRoutes)

// Define a porta que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Sincronize o banco de dados com os modelos
sequelize.sync({ alter: true }) // 'alter' ajusta as tabelas existentes para corresponder aos modelos
  .then(() => {
    console.log('Database synced');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.error('Error syncing database:', error));
 