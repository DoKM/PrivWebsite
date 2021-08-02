"use strict";
exports.__esModule = true;
exports.VideoBackgroundPlayer = void 0;
var Plyr = require("plyr");
var es6_promise_1 = require("es6-promise");
var vidoes = ["I6RVE0xYjoI", "4LMu5oLrMTo", "N5Z1SxyGnts", "MyWVquDJ-Qc", "Xq7PJtst8cY"];
var VideoBackgroundPlayer = /** @class */ (function () {
    function VideoBackgroundPlayer(videoUrls) {
        this.videoUrls = videoUrls;
    }
    VideoBackgroundPlayer.prototype.setupPlayer = function () {
        var _this = this;
        this.player = new Plyr(document.getElementById("player"), {
            tooltips: {
                controls: true
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
                noCookie: false
            }
        });
        this.player.on("ended", function (event) {
            _this.setSource(_this.getRandomSource());
        });
        this.player.on("ready", function (event) {
            _this.play();
        });
        this.setSource(this.getRandomSource());
    };
    VideoBackgroundPlayer.prototype.play = function () {
        this.player.play();
    };
    VideoBackgroundPlayer.prototype.setSource = function (source) {
        this.player.source = {
            type: 'video',
            sources: [
                {
                    src: source,
                    provider: 'youtube'
                },
            ]
        };
    };
    VideoBackgroundPlayer.prototype.getRandomSource = function () {
        return this.videoUrls[Math.floor(Math.random() * this.videoUrls.length)];
    };
    VideoBackgroundPlayer.prototype.autoplayUnlock = function (element) {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (context.state === 'suspended') {
                var unlock = function unlock() {
                    context.resume()
                        .then(function () {
                        window.removeEventListener('keydown', unlock);
                        element.removeEventListener('click', unlock);
                        element.removeEventListener('touchstart', unlock);
                        element.removeEventListener('touchend', unlock);
                        resolve();
                    })["catch"](function (error) {
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
    };
    VideoBackgroundPlayer.prototype.testUnlock = function () {
        var _this = this;
        this.autoplayUnlock(document.getElementById("player"))
            .then(function () {
            _this.setSource(_this.getRandomSource());
            _this.play();
        })["catch"](function (error) {
            console.error(error);
        });
    };
    VideoBackgroundPlayer.prototype.setCheckIfElementExists = function () {
        var _this = this;
        this.checkIfElementExists = setInterval(function () {
            if (document.getElementById("remote-media")) {
                console.log("Exists!");
                clearInterval(_this.checkIfElementExists);
                _this.setupPlayer();
                _this.testUnlock();
            }
        }, 1000);
    };
    return VideoBackgroundPlayer;
}());
exports.VideoBackgroundPlayer = VideoBackgroundPlayer;
