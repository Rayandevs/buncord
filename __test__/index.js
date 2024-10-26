const prompt = require('prompts');
const fs = require('node:fs');
const { exec } = require('child_process');


(async() => {
    const files = fs.readdirSync('./__test__');
    const choices = [];
    for (const file of files) {
        choices.push({ title: file, value: file })
    }

    await prompt({ 
        name: "file-select",
        type: "multiselect", 
        message: "Select a file",
        choices: choices,
        instructions: true
    }, { 
       async onSubmit(_, a, $) {
        exec(`node __test__/${a}`, (error, stdout, stderr) => {
            console.log('out', stdout);
            console.log('err', stderr);

            if (error != null) console.error('execerr', error);
        });
       }
    })
})()