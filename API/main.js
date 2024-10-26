const express = require("express");
const { APIError } = require('./Utility/HTTPError');
const { checkHeader } = require("./Utility/Header");
const fs = require('node:fs');
const facts = require('../data/facts.json');

const app = express();

process.loadEnvFile(".env");

app.get('/api/fact', (req, res) => {
    console.info(`[INFO] >> GET /api/fact`);
    const { index } = req.query;

    // Handle random fact.
    if (!index) {
        const random = facts.at(Math.random() * facts.length);
        res.status(200).json({ text: random });
        return;
    }

    if (isNaN(index)) {
        res.status(400)
        .json(
            new APIError("/api/fact/:index ; index has to be a number or none", 400)
            .object({ text: `A number between 0 and ${facts.length}` })
        );

        return;
    }

    if (index > facts.length) {
        res.status(400)
        .json(
            new APIError(`/api/fact/:index ; index has to be less than ${facts.length}`, 400)
            .object()
        )

        return;
    }

    const item = facts.at(index);
    res.status(200).json({ text: item });
    return;
});

app.post('/api/fact', checkHeader, (req, res) => {
    const developerName = req.header("username");
    console.info(`[INFO] >> POST /api/fact » ${developerName}`);
    const fact = req.header("text");

    const factsJson = fs.readFileSync("./data/facts.json");
    const data = JSON.parse(factsJson)
    data.push(fact);

    fs.writeFileSync('./data/facts.json', JSON.stringify(data), "utf-8");
    res.status(200).json({ code: 200 });
});

app.listen(3000, () => console.info(`[INFO] >> API is online.`));