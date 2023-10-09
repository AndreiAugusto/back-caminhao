const { Model, DataTypes } = require("sequelize");

class MotoristaModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nomeMotorista: DataTypes.TEXT,
            nascimento: DataTypes.DATEONLY,
            nCarteira: DataTypes.TEXT
        }, {
            tableName: 'Motorista',
            modelName: 'MotoristaModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.CaminhaoMotoristaModel, { foreignKey: 'motoristaId' });
    }
}

module.exports = { MotoristaModel };
