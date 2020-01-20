const express = require('express');
const path = require('path');

const nameOfApp = 'voice-chat-client';
const pathToDist = 'clientSideCode/voice-chat-client';

const app = express();

app.use(express.static(`${pathToDist}/dist/${nameOfApp}`));

app.get('/*', function(req, res) {
    res.sendFile(path.join(`${pathToDist}/dist/${nameOfApp}/index.html`));
});

app.listen(process.env.PORT || 8080);

// clientSideCode/voice-chat-client/dist/voice-chat-client/index.html