const fs = require('fs');

function compress() {
    const main = require('../bin/lang/dictionary.json');

    const temp = Object.keys(main).reduce((output, id) => {
        output[id] = main[id]
        return output
    }, {});

    fs.writeFile((`./bin/lang/dictionary.min.json`), JSON.stringify(temp), function (err) {
        if (err) console.error(err)

        console.info('••••• Compress dictionary successful.')
    });
}

compress();