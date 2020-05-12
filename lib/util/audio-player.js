"use strict";
/*------------------------------------------------------------------------------
   About      : Class responsible for playing audio files in the app.
   
   Created on : Sat Sep 02 2017
   Author     : Raghvendra Varma
   
   Copyright (c) 2017 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var AudioFile = /** @class */ (function () {
    function AudioFile(fileName, volume) {
        this.fileName = fileName;
        this.volume = volume;
        this.fileName = 'sounds/' + fileName;
        this.volume = volume || .8;
    }
    return AudioFile;
}());
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer(rc) {
        this.rc = rc;
        this.SELECT = new AudioFile('select.mp3', 0.4);
        this.audioMap = {};
        this.rc.setupLogger(this, 'AudioFile');
    }
    AudioPlayer.prototype.play = function (file) {
        var control = this.audioMap[file.fileName];
        if (!control) {
            control = this.audioMap[file.fileName] = new Audio(file.fileName);
            control.load();
            control.volume = file.volume;
        }
        else {
            var isPlaying = control.currentTime > 0 && !control.paused && !control.ended && control.readyState > 2;
            if (isPlaying) {
                control.pause();
                control.currentTime = 0;
            }
        }
        try {
            control.play();
        }
        catch (err) {
            this.rc.isError() && this.rc.error(this.rc.getName(this), { fileName: file.fileName }, err);
        }
    };
    return AudioPlayer;
}());
exports.AudioPlayer = AudioPlayer;
//# sourceMappingURL=audio-player.js.map