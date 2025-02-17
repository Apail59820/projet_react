import express from "express"
import 'dotenv/config'

const app = express();

const { PORT } = process.env;

app.get('ping', (req, res) => {
    return res.end('Pong')
});

app.listen(PORT, () => {
    console.log(`Listenning on port ${PORT}`);
})