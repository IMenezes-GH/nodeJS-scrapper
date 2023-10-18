# Simple NodeJS Scrapper
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)    
A simple node static webscrapper that crawls and scraps for data based on querySelector parameters. 
The scrapper works by reading a .json file that the user edits at the ./config folder.

## How to use:

 1. Clone the project: `git clone https://github.com/IMenezes-GH/nodeJS-scrapper.git` or `git clone git@github.com:IMenezes-GH/nodeJS-scrapper.git`
 2. `cd` into the project and run `npm install`
 3. run `npm run config`
 4. open ./config/config.json and add/edit the urls or queries.
 5. run `npm run download` everytime you add new urls to the request "urls" array
 6. run `npm start` to scrap the data. It should output to a folder called ./data/

 ### To-do:

 - [x] Basic project implementation
 - [x] Add the ability to output to csv
 - [ ] Add a static HTML page for generating quick config.json files
 - [ ] Add routing/crawling
