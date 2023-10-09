const { Model, DataTypes} = require("sequelize");

class CaminhaoMotoristaModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            dataInicio: DataTypes.DATEONLY,
            motoristaId: DataTypes.INTEGER,
            caminhaoId: DataTypes.INTEGER
        }, {
            tableName: 'Caminhao_Motorista',
            modelName: 'CaminhaoMotoristaModel',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models){
        this.belongsTo(models.CaminhaoModel, {foreignKey:'caminhaoId'}),
        this.belongsTo(models.MotoristaModel, {foreignKey:'motoristaId'})
    }
}

module.exports = { CaminhaoMotoristaModel };
