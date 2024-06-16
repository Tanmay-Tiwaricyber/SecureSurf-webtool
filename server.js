const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'AIzaSyB7ysGyfRDrKPCsyOLff9MxMsZbURQ2AIg';

app.use(express.static('public'));
app.use(express.json());

app.post('/check-url', async (req, res) => {
    const { url } = req.body;
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
    const requestData = {
        client: {
            clientId: 'yourcompanyname',
            clientVersion: '1.5.2'
        },
        threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [
                { url }
            ]
        }
    };

    try {
        const response = await axios.post(apiUrl, requestData);
        if (response.data.matches) {
            res.json({ isPhishing: true });
        } else {
            res.json({ isPhishing: false });
        }
    } catch (error) {
        console.error('Error checking URL:', error);
        res.status(500).json({ error: 'Error checking the site' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
