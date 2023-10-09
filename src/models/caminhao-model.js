const { Model, DataTypes } = require("sequelize");

class CaminhaoModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            modelo: DataTypes.TEXT,
            ano: DataTypes.DATEONLY,
            placa: DataTypes.TEXT
        }, {
            tableName: 'Caminhao',
            modelName: 'CaminhaoModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.CaminhaoMotoristaModel, { foreignKey: 'caminhaoId' });
        this.hasMany(models.ManutencaoModel, { foreignKey: 'caminhaoId' });
    }
}

module.exports = { CaminhaoModel };
