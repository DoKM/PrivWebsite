const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

import { videoList } from '../public/js/VidoesList.js'

const port = 8080


const env = nunjucks.configure(`${__dirname}/TemplateFolder`, { autoescape: true, });
env.express(app);


app.use("/public", express.static("public"));

app.get(["/", "/index.html","index"], async function(req:any, res:any) {
  
  res.render(`index.blade.html`, {video: videoList[Math.floor(Math.random() * videoList.length)]})

});



app.listen(port);
  
console.log(`listening on localhost:${port}`)


