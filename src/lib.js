const fs = require("fs");
const promises = require("fs").promises;
const jsdom = require("jsdom");
const path = require("path");

/**
 *  Downloads and Parses a given url
 * @param {strin} url An URL
 * @returns A parsed webpage
 */
async function parser(url){

    const page = await requester(url);
    const dom = new jsdom.JSDOM(page);
    
    return dom;
}

/**
 *  Requests a webpage and returns in Buffer format
 * @param {string} url An URL
 * @returns {string} A webpage in string format
 */
async function requester(url){
    try {

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error on fetch");
    
        return await res.text();

    } catch (err){
        console.error(err);
    }
}

/**
 *  Requests, parses and downloads a webpage
 * @param {string} url an URL
 */
async function downloader(url){
    try{
        const page = await requester(url);
        const dom = new jsdom.JSDOM(page);
        
        const outputPath = path.join(__dirname, "..", "pages");
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, {recursive: true});

        const title = dom.window.document.title.replace(/\ /g, '_').replace(/:/g, '-');
        
        await promises.writeFile(path.join(outputPath, title + ".html"), page);
    }
    catch (err){
        console.error(err);
    }
}

function cleanTextContent(htmlElement){
    try {
        const content = htmlElement.textContent.replace(/\t/g, '').replace(/\n/g, ' ') + '\n';
        return content;
    } catch (err){
        return ''
    }
}

/**
 *  Crawls through a webpage and scrappes for data based on passed queries
 * @param {string} file_name the name of a file inside a '../pages/' directory.
 * @param {Array<string>} queries DOM Queries to be executed
 */
async function scrapper(file_name, queries){
    if (file_name === undefined) throw new Error('file_name is required.');
    if (queries === undefined || !Array.isArray(queries)) throw new Error('Queries is required and must be an array.');

    try {
        const folder = path.join(__dirname, '..', 'data');

        if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true});
        
        const file = await promises.readFile(path.join(__dirname, '..', 'pages', file_name));
        const dom = new jsdom.JSDOM(file);

        await promises.writeFile(path.join(__dirname, '..', 'data', file_name + '.txt'), ''); // Cleans file
        const queriesArray = []

        for (let i = 0; i < queries.length; i++){

            const result = dom.window.document.querySelectorAll(queries[i]);
            queriesArray.push(result);
        }

        for (let i = 0; i < queriesArray[0].length; i++){
            const line = queriesArray.reduce((acc, curr) => {return acc + curr[i].textContent + '\t'}, '')
            fs.appendFileSync(path.join(__dirname, '..', 'data', file_name + '.csv'), line + '\n');
        }

    } catch (err){
        console.error(err);
    }
}

module.exports = {scrapper, downloader, parser, requester}