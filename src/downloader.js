const { downloader } = require('./lib.js');
const config = require('../config/config.json');

const {requests} = config;

const TIME = Number(config.crawltime);

// Download pages
async function downloadPages(){
    for (let i = 0; i< requests.urls.length; i++){
        console.log('Downloading webpage: ', requests.urls[i], '...')

        await new Promise(resolve => setTimeout(resolve, TIME));
        downloader(requests.urls[i]);
        console.log('Finished downloading')
    }
    console.log('Finished downloading all pages')
}

downloadPages();
