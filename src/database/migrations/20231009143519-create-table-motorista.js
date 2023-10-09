'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Motorista', {
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
      },
      nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      nCarteira:{
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Motorista');
  }
};
