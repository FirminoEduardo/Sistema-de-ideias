const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const { Idea, Comment, User } = require('../models'); // Certifique-se de incluir o modelo User aqui

const router = express.Router();

// Rota para buscar todas as ideias com comentários
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.findAll({
            where: {
                isArchived: false,
            },
            include: [{ 
                model: Comment, 
                as: 'comments',
                attributes: ['id', 'comentario', 'votos', 'ideaId', 'userId', 'createdAt', 'updatedAt'] 
            }],
            order: [['votos', 'DESC']]
        });
        res.status(200).json(ideas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar ideias', error });
    }
});
// Rota para submeter uma nova ideia
router.post('/submit', verifyToken, async (req, res) => {
    const { titulo, descricao, categoria } = req.body;

    try {
        const newIdea = await Idea.create({ titulo, descricao, categoria, votos: 0, status: 'nova' });
        res.status(201).json(newIdea); // Retorna a nova ideia
    } catch (error) {
        res.status(500).json({ message: 'Erro ao submeter ideia', error });
    }
});

// Rota para votar em uma ideia
router.post('/:id/vote', verifyToken, async (req, res) => {
    try {
        const idea = await Idea.findByPk(req.params.id);
        if (!idea) {
            return res.status(404).json({ message: 'Ideia não encontrada' });
        }
        idea.votos += 1; // Incrementa o número de votos
        await idea.save();
        res.status(200).json({ message: 'Voto registrado com sucesso', votos: idea.votos });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao votar na ideia', error });
    }
});

// Rota para adicionar um comentário em uma ideia
router.post('/:id/comments', verifyToken, async (req, res) => {
    const { comentario } = req.body; // Pegue o valor de 'comentario'

    if (!comentario) {
        return res.status(400).json({ message: 'O conteúdo do comentário é obrigatório' });
    }

    try {
        const idea = await Idea.findByPk(req.params.id);
        if (!idea) {
            return res.status(404).json({ message: 'Ideia não encontrada' });
        }

        // Adiciona o comentário com o campo 'comentario'
        const newComment = await Comment.create({ comentario, ideaId: idea.id, votos: 0 });
        res.status(201).json({ message: 'Comentário adicionado com sucesso', comment: newComment });
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ message: 'Erro ao adicionar o comentário', error: error.message });
    }
});

// Rota para votar em um comentário
router.post('/:ideaId/comments/:commentId/vote', verifyToken, async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado' });
        }

        comment.votos += 1; // Incrementa o número de votos
        await comment.save();
        res.status(200).json({ message: 'Voto no comentário registrado com sucesso', votos: comment.votos });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao votar no comentário', error });
    }
});

// Rota para arquivar uma ideia
router.put('/:id/archive', verifyToken, async (req, res) => {
    try {
        const idea = await Idea.findByPk(req.params.id);
        if (!idea) {
            return res.status(404).json({ message: 'Ideia não encontrada' });
        }

        // Verifica se o usuário é um administrador
        if (req.user.permissao !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para arquivar esta ideia.' });
        }

        idea.isArchived = true; // Use 'isArchived' em vez de 'archived'
        await idea.save();

        res.status(200).json({ message: 'Ideia arquivada com sucesso' });
    } catch (error) {
        console.error('Erro ao arquivar a ideia:', error);
        res.status(500).json({ message: 'Erro ao arquivar a ideia', error: error.message });
    }
});

module.exports = router;