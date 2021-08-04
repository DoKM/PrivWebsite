//const express = require('express')
import express from 'express';
const app = express()
//const nunjucks = require('nunjucks')
import nunjucks from "nunjucks"

import { videoList } from '../public/js/VidoesList.js'

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const port = 8080


const env = nunjucks.configure(`${__dirname}/TemplateFolder`, { autoescape: true, });
env.express(app);


app.use("/public", express.static("public"));

app.get(["/", "/index.html","index"], async function(req, res) {
  
  res.render(`index.blade.html`, {video: videoList[Math.floor(Math.random() * videoList.length)]})

});



app.listen(port);
  
console.log(`listening on localhost:${port}`)


