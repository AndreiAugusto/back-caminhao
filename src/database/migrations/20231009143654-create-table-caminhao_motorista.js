'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Caminhao_Motorista', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      data:{
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      caminhaoId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'Caminhao', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'        
      },
      motoristaId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'Motorista', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'               
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Caminhao_Motorista');
  }
};
