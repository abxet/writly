import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import { OpenAI } from 'openai/client.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req, res) => {
    res
     .send('Welcome to server!')
     .status(200);
});

// GROQ client
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

// create API
app.post(
    "/api",
    async (req, res) => {
        try {
            const {text, type} = req.body;

            let prompt = "";
            // set prompt 
            if (type == "rewrite") {
                prompt = `Rewrite this professionally:\n${text}`;
            } else if (type == "summarize") {
                prompt = `Summarize this text:\n${text}`;
            };

            // get response from GROQ
            const response = await client.chat.completions.create({
                // set model
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
            });

            // send res to client
            res.json({
                result: response.choices[0].message.content,
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Something went wrong" });
        }
    }
);

app.listen(port, () => {
    console.log(`
╔══[SERVER]═══════════════════════════════════╗
║ -> server started                           ║
║ -> live @ http://localhost:5000/            ║
╚═════════════════════════════════════════════╝        
    `);
});


