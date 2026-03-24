const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();
// Middlewares
app.use(express.json());
// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
const logger = require("./middlewares/logger");
const cors = require("cors");
app.use(cors());
app.use(logger);
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

// Middleware de rota não encontrada (sempre por último!)
const notFound = require("./middlewares/notFound");
app.use(notFound);

// Rota raiz
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        documentacao: "/api-docs",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes",
        },
    });
});
module.exports = app;