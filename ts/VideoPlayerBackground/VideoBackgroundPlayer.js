// declare class Plyr {
//   constructor(element:HTMLElement, something:Object) {
//   }
//   public on:any
//   public source:any
//   public play:any
// }
export { VideoBackgroundPlayer };
class VideoBackgroundPlayer {
    constructor(videoUrls) {
        this.videoUrls = videoUrls;
        this.setCheckIfElementExists();
    }
    setupPlayer() {
        // @ts-ignore
        this.player = new Plyr(document.getElementById("player"), {
            tooltips: {
                controls: true,
            },
            fullscreen: { enabled: false },
            clickToPlay: false,
            disableContextMenu: true,
            hideControls: true,
            controls: [],
            settings: [],
            youtube: {
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                // Custom settings from Plyr
                customControls: true,
                noCookie: false,
            }
        });
        this.player.on("ended", (event) => {
            this.setSource(this.getRandomSource());
        });
        this.player.on("ready", (event) => {
            this.play();
        });
        this.setSource(this.getRandomSource());
    }
    play() {
        this.player.play();
    }
    setSource(source) {
        this.player.source = {
            type: 'video',
            sources: [
                {
                    src: source,
                    provider: 'youtube',
                },
            ],
        };
    }
    getRandomSource() {
        return this.videoUrls[Math.floor(Math.random() * this.videoUrls.length)];
    }
    autoplayUnlock(element) {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        // @ts-ignore
        return new Promise((resolve, reject) => {
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
            }
            else {
                resolve();
            }
        });
    }
    testUnlock() {
        this.autoplayUnlock(document.getElementById("player"))
            .then(() => {
            this.setSource(this.getRandomSource());
            this.play();
        })
            .catch(function (error) {
            console.error(error);
        });
    }
    setCheckIfElementExists() {
        this.checkIfElementExists = setInterval(() => {
            if (document.getElementById("player")) {
                console.log("Exists!");
                clearInterval(this.checkIfElementExists);
                this.setupPlayer();
                this.testUnlock();
            }
        }, 1000);
    }
}
