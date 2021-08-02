// @deno-types="https://github.com/lumeland/denjucks/raw/master/mod.d.ts"
import denjucks from "https://github.com/lumeland/denjucks/raw/master/mod.js";
import { dirname, join } from "https://deno.land/x/opine@1.3.2/deps.ts";
import { opine, serveStatic } from "https://deno.land/x/opine@1.3.2/mod.ts";

import { videoList } from "../public/js/VidoesList.js"


const port = 8080
const __dirname = dirname(import.meta.url);
const app = opine();
denjucks.configure(`${Deno.cwd()}/src/TemplateFolder`, { autoescape: true,
  });



app.use("/public", serveStatic(join(__dirname, "../public")));

app.get("/", async function(req, res) {
  res.body = await denjucks.render(`index.blade.html`, {video: videoList[Math.floor(Math.random() * videoList.length)]})
  res.status = 200
  res.send();
});



app.listen(8080);
  
console.log(`listening on localhost:${port}`)


