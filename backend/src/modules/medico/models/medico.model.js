const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const MedicoModel = sequelize.define('Medico', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
})