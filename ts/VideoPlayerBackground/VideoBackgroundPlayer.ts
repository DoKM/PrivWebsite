export { VideoBackgroundPlayer };

class VideoBackgroundPlayer {
  constructor(videoUrls: String[]) {
    this.videoUrls = videoUrls;
    this.setCheckIfElementExists();
  }
  private videoUrls: String[];
  // @ts-ignore
  private player: Plyr | undefined;

  private setupPlayer() {
    // @ts-ignore
    this.player = new Plyr(document.getElementById("player")!, {
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
        showinfo: 0, // Hide info
        iv_load_policy: 3, // Hide annotations
        modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
        // Custom settings from Plyr
        customControls: true,
        noCookie: false,
      },
    });
    this.player.on("ended", (event: any) => {
      this.setSource(this.getRandomSource());
    });

    this.player.on("ready", (event: any) => {
      this.play();
    });
  }

  private play() {
    this.player!.play();
  }

  private setSource(source: String) {
    this.player!.source = {
      type: "video",
      sources: [
        {
          src: source as string,
          provider: "youtube",
        },
      ],
    };
  }

  private getRandomSource() {
    return this.videoUrls[Math.floor(Math.random() * this.videoUrls.length)];
  }

  private autoplayUnlock(element: HTMLElement) {
    var context = new (window.AudioContext || window.webkitAudioContext!)();
    // @ts-ignore
    return new Promise<void>((resolve, reject) => {
      if (context.state === "suspended") {
        var unlock = function unlock() {
          context
            .resume()
            .then(function () {
              window.removeEventListener("keydown", unlock);
              document.removeEventListener("click", unlock);
              document.removeEventListener("touchstart", unlock);
              document.removeEventListener("touchend", unlock);

              resolve();
            })
            .catch(function (error) {
              reject(error);
            });
        };

        window.addEventListener("keydown", unlock, false);
        document.addEventListener("click", unlock, false);
        document.addEventListener("touchstart", unlock, false);
        document.addEventListener("touchend", unlock, false);
      } else {
        resolve();
      }
    });
  }

  private testUnlock() {
    this.autoplayUnlock(document.getElementById("player")!)
      .then(() => {
        
        this.play();
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  private checkIfElementExists: number | undefined;

  private setCheckIfElementExists() {
    this.checkIfElementExists = setInterval(() => {
      if (document.getElementById("player")) {
        clearInterval(this.checkIfElementExists);
        this.setupPlayer();
        this.testUnlock();
      }
    }, 1000);
  }
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
