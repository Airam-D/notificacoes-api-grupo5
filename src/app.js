const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// MIDDLEWARES GLOBAIS
app.use(express.json());
app.use(cors());
const responseTime = require("./middlewares/responseTime");
app.use(responseTime);

// Registrar observers (basta importar para ativar)
require('./events/notificacaoObserver');
require('./events/logObserver');
require('./events/boasVindasObserver');

// DOCUMENTAÇÃO
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROTAS
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
const exportRoutes = require('./routes/exportRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');
const path = require('path');

// Uso de rotas com prefixos
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use('/exportar', exportRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/notificacoes/teste-email', notificacaoRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        versao: "1.0.0",
        documentacao: "/api-docs",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",
            exportar: "/exportar",
            uploads: "/uploads",
            notificacoes: "/notificacoes",
            teste_email: "/notificacoes/teste-email"

        },
    });
});

// MIDDLEWARES DE ERRO (sempre por último!)
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
app.use(notFound);
app.use(errorHandler);

module.exports = app;