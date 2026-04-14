require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

async function iniciar() {
    try {
        // Testar conexão com o banco
        await sequelize.authenticate();
        console.log("Conexão com MySQL estabelecida com sucesso!");

        // Iniciar o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
            console.log(`Documentação: http://localhost:${PORT}/api-docs`);
        });
    } catch (erro) {
        console.error("Erro ao conectar com o banco de dados:", erro.message);
        process.exit(1);
    }
}

iniciar();