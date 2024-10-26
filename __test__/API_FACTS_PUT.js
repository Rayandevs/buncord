const assert = require('node:assert');
const node = require('node:test');
const { config, makeHeaders } = require('./constants');
process.loadEnvFile(".env");

node.describe("POST /api/fact RD >>", () => {    
    node.it("code should be = 200", async () => {
        const res = await fetch(`${config.api}/fact`, {
            method: "POST",
            headers: makeHeaders({ text: "Cats are amazing" }),
        });

        const json = await res.json();
        assert.deepStrictEqual(json, { code: 200 });
    });
});