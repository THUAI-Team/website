"use strict";
cc._RF.push(module, '698b3HpkKxJF5ifa7ys8BOK', 'File');
// Script/File.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var EGG_COUNT = 15,
    PLAYER_COUNT = 12;

function arrayBufferToString(ab) {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(ab)));
}

function readHeader(view) {
  var frameCount = view.getUint16(8, true);
  var fps = view.getUint16(10, true);
  var redScore = view.getUint32(12, true),
      yellowScore = view.getUint32(16, true),
      blueScore = view.getUint32(20, true);
  var timestampLeft = view.getUint32(24, true),
      timestampRight = view.getUint32(28, true);
  var timestamp = new Date((timestampRight * Math.pow(2, 32) + timestampLeft) * 1000); // s -> ms
  // NOTE: code above cannot handle years < 1970, but it doesn't matter

  var eggScores = [],
      eggScoresOffset = 32;

  for (var i = 0; i < EGG_COUNT; i++) {
    eggScores[i] = view.getUint8(eggScoresOffset + i);
  }

  return {
    frameCount: frameCount,
    fps: fps,
    redScore: redScore,
    yellowScore: yellowScore,
    blueScore: blueScore,
    timestamp: timestamp,
    eggScores: eggScores
  };
}

function readFrame(view, eggScores, offset) {
  var playerInfo = [];
  var eggInfo = [];

  for (var id = 0; id < PLAYER_COUNT; id++) {
    var x = view.getFloat32(offset + 120 + 4 * id, true),
        y = view.getFloat32(offset + 168 + 4 * id, true);
    var enduranceZipped = view.getUint8(offset + 228 + id);
    playerInfo.push({
      id: id,
      position: [x, y],
      eggInHand: view.getInt8(offset + 216 + id),
      endurance: enduranceZipped / 255.0 * 5.0
    });
  }

  for (var _id = 0; _id < EGG_COUNT; _id++) {
    var _x = view.getFloat32(offset + 4 * _id, true),
        _y = view.getFloat32(offset + 60 + 4 * _id, true);

    eggInfo.push({
      id: _id,
      position: [_x, _y],
      score: eggScores[_id]
    });
  }

  return {
    playerInfo: playerInfo,
    eggInfo: eggInfo
  };
}

function readFromRecordFile(blob) {
  var view = new DataView(blob);

  if (arrayBufferToString(blob.slice(0, 6)) !== 'THAIEG' || view.getUint16(6, true) !== 1) {
    return null;
  }

  var header = readHeader(view);
  var frames = [];
  var frameSizeInBytes = 240;

  for (var frameNum = 0, offset = 47; frameNum < header.frameCount; frameNum++, offset += frameSizeInBytes) {
    frames.push(readFrame(view, header.eggScores, offset));
  }

  return {
    header: header,
    frames: frames
  };
}

cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  update: function update(dt) {}
});

cc._RF.pop();