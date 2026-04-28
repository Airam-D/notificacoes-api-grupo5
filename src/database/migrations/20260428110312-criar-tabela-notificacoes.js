'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("notificacoes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      inscricao_id: {
        type: Sequelize.INTEGER,
        references: { model: "eventos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tipo: {
        type: Sequelize.ENUM('confirmacao', 'lembrete'),
        allowNull: false,
      },
      destinario_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assunto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conteudo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      data_envio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      enviada: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });
  }
}
