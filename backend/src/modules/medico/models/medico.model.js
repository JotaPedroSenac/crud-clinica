const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const MedicoModel = sequelize.define('Medico', {
    crm: {
        type: DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            isNumeric: true,
            len: [6, 6]
        }
    },
    nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: [2, 200]
        }
    },
    especialidade: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: [4, 200]
        }
    }
}, {
    tableName: 'medicos',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = MedicoModel;