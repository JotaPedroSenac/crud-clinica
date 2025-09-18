const MedicoModel = require('../models/medico.model');

class MedicoController {
    static async criar(req, res) {
        try {
            const { crm, nome, especialidade } = req.body;
            if (!crm || !nome || !especialidade) {
                return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
            }
            const novoMedico = await MedicoModel.create({ crm, nome, especialidade });
            res.status(201).json(novoMedico);
        } catch (error) { 
            res.status(500).json({ mensagem: 'Erro interno do servidor', detalhe: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const medicos = await MedicoModel.findAll();
            if (medicos.length === 0) {
                return res.status(200).json({ mensagem: 'Não há médicos disponíveis' });
            }
            res.status(200).json(medicos);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro interno do servidor', detalhe: error.message });
        }
    }

    static async atualizar(req, res) {
        try {
            const { crm } = req.params;
            const { nome, especialidade } = req.body;

            if (!nome || !especialidade) {
                return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
            }

            const [linhasAfetadas] = await MedicoModel.update(
                { nome, especialidade },
                { where: { crm } }
            );

            if (linhasAfetadas === 0) {
                return res.status(404).json({ mensagem: 'Médico não encontrado' });
            }

            const medicoAtualizado = await MedicoModel.findByPk(crm);
            res.status(200).json(medicoAtualizado);
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro interno do servidor', detalhe: error.message });
        }
    }

    static async deletar(req, res) {
        try {
            const { crm } = req.params;
            const medico = await MedicoModel.findByPk(crm);

            if (!medico) {
                return res.status(404).json({ mensagem: 'Médico não encontrado' });
            }

            await MedicoModel.destroy({ where: { crm } });
            res.status(200).json({ mensagem: 'Médico excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro interno do servidor', detalhe: error.message });
        }
    }
}

module.exports = MedicoController;
