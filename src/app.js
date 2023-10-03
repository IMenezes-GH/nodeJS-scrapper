const {parser, requester, scrapper} = require('./lib.js');

const config = require('../config/config.json');
const {orders} = config;

// Load orders and execute queries
for (let i = 0; i < orders.length; i++){
    const {pages, queries} = orders[i];

    for (let j = 0; j < orders[i].pages.length; j++){
        scrapper(pages[j], queries)
    }
}