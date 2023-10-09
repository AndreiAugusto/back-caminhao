const { Model, DataTypes} = require("sequelize");

class ManutencaoModel extends Model {
    static init(database) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            descricao: DataTypes.TEXT,
            custo: DataTypes.FLOAT,
            data: DataTypes.DATEONLY,
            caminhaoId: DataTypes.INTEGER,
            oficinaId: DataTypes.INTEGER
        }, {
            tableName: 'Manutencao',
            modelName: 'ManutencaoModel',
            timestamps: false,
            sequelize: database
        });
    }

    static associate(models){
        this.belongsTo(models.CaminhaoModel, {foreignKey:'caminhaoId'}),
        this.belongsTo(models.OficinaModel, {foreignKey:'oficinaId'})
    }
}

module.exports = { ManutencaoModel };
