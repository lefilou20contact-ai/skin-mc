const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Clé API Replicate (à remplacer par ta clé)
const REPLICATE_API_TOKEN = 'ton_api_token_ici';

// Endpoint pour générer un skin
app.get('/generate-skin', async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).send('Description manquante.');

    try {
        const response = await axios.post(
            'https://api.replicate.com/v1/predictions',
            {
                version: 'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
                input: { prompt: prompt }
            },
            {
                headers: {
                    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Simuler une réponse (à remplacer par la vraie logique)
        res.send({
            skinUrl: 'https://via.placeholder.com/64/00ff00/000000?text=Skin+Généré'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la génération du skin.');
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});