import { askGemini } from '../services/compostAIService.js';

export const chat = async (req, res) => {
    try {
        const message = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        const compostKeywords = ['compostagem', 'composto', 'adubo', 'orgânico', 'resíduos', 'minhocário', 'húmus', 'pilha', 'terra', 'material verde', 'material marrom', 'composteira', 'biodegradável', 'lixo orgânico'];
        const isCompostRelated = compostKeywords.some(keyword => message.toLowerCase().includes(keyword));

        if (!isCompostRelated) {
            return res.status(400).json({ message: "Please ask something related to composting." });
        }  

        const response = await askGemini(message);
        res.json({ response: response });
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}