'use strict';

const sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Caminhao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      modelo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ano: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      placa:{
        type: Sequelize.TEXT,
        allowNull: false,
        unique:true
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Caminhao');
  }
};
