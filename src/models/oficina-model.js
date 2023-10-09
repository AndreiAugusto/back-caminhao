const { Model, DataTypes } = require("sequelize");

class OficinaModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nomeOficina: DataTypes.TEXT
        }, {
            tableName: 'Oficina',
            modelName: 'OficinaModel',
            timestamps: false,
            sequelize: database
        });
    }
    static associate(models){
        this.hasMany(models.ManutencaoModel, { foreignKey: 'oficinaId' });
    }
}

module.exports = { OficinaModel };
