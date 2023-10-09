'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Oficina', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      nomeMotorista: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Oficina');
  }
};
