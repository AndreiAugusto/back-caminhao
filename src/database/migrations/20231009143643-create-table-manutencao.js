'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Manutencao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      descricao:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      custo: {
        type: Sequelize.FLOAT,
        allowNull: false
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
      oficinaId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'Oficina', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'               
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Manutencao');
  }
};
