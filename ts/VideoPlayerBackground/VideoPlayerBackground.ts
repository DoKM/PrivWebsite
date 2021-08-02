//https://github.com/tdaines/plyr/blob/296-typescript-definitions/plyr.d.ts
import Plyr from 'https://cdn.plyr.io/3.6.4/plyr.js';



const vidoes = ["I6RVE0xYjoI", "4LMu5oLrMTo", "N5Z1SxyGnts", "MyWVquDJ-Qc", "Xq7PJtst8cY"]

export class VideoBackgroundPlayer {
  constructor(videoUrls: String[]){
    this.videoUrls = videoUrls
  }
  private videoUrls: String[]

  private player: Plyr | undefined;

  private setupPlayer(){
    this.player = new Plyr(document.getElementById("player")!, {
      tooltips: {
        controls: true,
      },
      fullscreen: {enabled: false},
      clickToPlay: false,
      disableContextMenu: true,
      hideControls: true,
      controls: [],
      settings: [],
      youtube: {
        rel:0,
        showinfo: 0, // Hide info
        iv_load_policy: 3, // Hide annotations
        modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
        // Custom settings from Plyr
        customControls: true,
        noCookie: false,
      }
  })
  this.player.on("ended", event =>{
    this.setSource(this.getRandomSource())
  })

  this.player.on("ready", event => {
    this.play()
  })

  this.setSource(this.getRandomSource())
} 

private play(){
  this.player!.play()
}

private setSource(source:String ){
  
  this.player!.source = {
    type: 'video',
    sources: [
      {
        src: source as string,
        provider: 'youtube',
      },
    ],
  };
}

private getRandomSource(){
  return this.videoUrls[Math.floor(Math.random() * this.videoUrls.length)]
}

private autoplayUnlock(element:HTMLElement) {
  var context = new (window.AudioContext || window.webkitAudioContext!)();

  return new Promise<void>((resolve, reject) => {
      if (context.state === 'suspended') {
          var unlock = function unlock() {
              context.resume()
                  .then(function () {
                      window.removeEventListener('keydown', unlock);
                      element.removeEventListener('click', unlock);
                      element.removeEventListener('touchstart', unlock);
                      element.removeEventListener('touchend', unlock);

                      resolve();
                  }).catch(function (error) {
                      reject(error);
                  });
          };

          window.addEventListener('keydown', unlock, false);
          element.addEventListener('click', unlock, false);
          element.addEventListener('touchstart', unlock, false);
          element.addEventListener('touchend', unlock, false);
      } else {
          resolve();
      }
  });
}

private testUnlock(){
  this.autoplayUnlock(document.getElementById("player")!)
  .then(() => {
    this.setSource(this.getRandomSource())
    this.play()
  })
  .catch(function(error) {
      console.error(error);
  });
}

private checkIfElementExists:number | undefined

private setCheckIfElementExists(){
  this.checkIfElementExists = setInterval(() => {
    if (document.getElementById("remote-media")) {
       console.log("Exists!");
       
       clearInterval(this.checkIfElementExists);
       this.setupPlayer()
       this.testUnlock()
    }
 }, 1000);
}
}


declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}


