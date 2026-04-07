const swaggerJsdoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notificações API",
            version: "1.0.0",
            description:
                "API para módulo de notificações por e-mail de uma plataforma de gerenciamento de evento"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor de desenvolvimento",
            },
        ],
        components: {
            schemas: {
                Evento: {
                    type: "object",
                    required: ["nome", "data"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID gerado automaticamente"
                        },
                        nome: {
                            type: "string",
                            description: "Nome do evento"
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição do evento"
                        },
                        data: {
                            type: "string",
                            format: "date",
                            description: "Data do evento"
                        },
                        local: {
                            type: "string",
                            description: "Local do evento"
                        },
                        capacidade: {
                            type: "integer",
                            description: "Capacidade máxima"
                        }
                    },
                    example: {
                        id: 1,
                        nome: "Workshop de Node.js",
                        descricao: "Aprenda Node.js do zero",
                        data: "2025-08-15",
                        local: "SENAI - Sala 3",
                        capacidade: 30
                    }
                },
                Participante: {
                    type: "object",
                    required: ["nome", "email"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID gerado automaticamente"
                        },
                        nome: {
                            type: "string",
                            description: "Nome do participante"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "E-mail do participante"
                        }
                    },
                    example: {
                        id: 1,
                        nome: "Ana Silva",
                        email: "ana@email.com"
                    }
                },
                Inscricao: {
                    type: "object",
                    required: ["eventoId", "participanteId"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID gerado automaticamente"
                        },
                        eventoId: {
                            type: "integer",
                            description: "ID do evento"
                        },
                        participanteId: {
                            type: "integer",
                            description: "ID do participante"
                        },
                        dataInscricao: {
                            type: "string",
                            format: "date-time",
                            description: "Data da inscrição"
                        },
                        status: {
                            type: "string",
                            enum: ["confirmada", "cancelada"],
                            description: "Status da inscrição"
                        }
                    },
                    example: {
                        id: 1,
                        eventoId: 1,
                        participanteId: 1,
                        dataInscricao: "2025-08-01T10:30:00.000Z",
                        status: "confirmada"
                    }
                }
            }
        }
    },
    // Onde o Swagger vai procurar os comentários de documentação
    apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;