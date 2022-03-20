
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/Eggs');
require('./assets/Script/File');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/File.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvRmlsZS5qcyJdLCJuYW1lcyI6WyJFR0dfQ09VTlQiLCJQTEFZRVJfQ09VTlQiLCJhcnJheUJ1ZmZlclRvU3RyaW5nIiwiYWIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsIkFycmF5IiwiZnJvbSIsIlVpbnQ4QXJyYXkiLCJyZWFkSGVhZGVyIiwidmlldyIsImZyYW1lQ291bnQiLCJnZXRVaW50MTYiLCJmcHMiLCJyZWRTY29yZSIsImdldFVpbnQzMiIsInllbGxvd1Njb3JlIiwiYmx1ZVNjb3JlIiwidGltZXN0YW1wTGVmdCIsInRpbWVzdGFtcFJpZ2h0IiwidGltZXN0YW1wIiwiRGF0ZSIsImVnZ1Njb3JlcyIsImVnZ1Njb3Jlc09mZnNldCIsImkiLCJnZXRVaW50OCIsInJlYWRGcmFtZSIsIm9mZnNldCIsInBsYXllckluZm8iLCJlZ2dJbmZvIiwiaWQiLCJ4IiwiZ2V0RmxvYXQzMiIsInkiLCJlbmR1cmFuY2VaaXBwZWQiLCJwdXNoIiwicG9zaXRpb24iLCJlZ2dJbkhhbmQiLCJnZXRJbnQ4IiwiZW5kdXJhbmNlIiwic2NvcmUiLCJyZWFkRnJvbVJlY29yZEZpbGUiLCJibG9iIiwiRGF0YVZpZXciLCJzbGljZSIsImhlYWRlciIsImZyYW1lcyIsImZyYW1lU2l6ZUluQnl0ZXMiLCJmcmFtZU51bSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxTQUFTLEdBQUcsRUFBbEI7QUFBQSxJQUFzQkMsWUFBWSxHQUFHLEVBQXJDOztBQUNBLFNBQVNDLG1CQUFULENBQTZCQyxFQUE3QixFQUFpQztBQUM3QixTQUFPQyxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLEtBQXBCLENBQTBCLElBQTFCLEVBQWdDQyxLQUFLLENB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Q0EsTUFBTUMsZ0JBQWdCLEdBQUcsR0FBekI7O0FBQ0EsT0FBSyxJQUFJQyxRQUFRLEdBQUcsQ0FBZixFQUFrQnJCLE1BQU0sR0FBRyxFQUFoQyxFQUFvQ3FCLFFBQVEsR0FBR0gsTUFBTSxDQUFDbEMsVUFBdEQsRUFBa0VxQyxRQUFRLElBQUlyQixNQUFNLElBQUlvQixnQkFBeEYsRUFBMEc7QUFDdEdELElBQUFBLE1BQU0sQ0FBQ1gsSUFBUCxDQUFZVCxTQUFTLENBQUNoQixJQUFELEVBQU9tQyxNQUFNLENBQUN2QixTQUFkLEVBQXlCSyxNQUF6QixDQUFyQjtBQUNIOztBQUNELFNBQU87QUFBRWtCLElBQUFBLE1BQU0sRUFBTkEsTUFBRjtBQUFVQyxJQUFBQSxNQUFNLEVBQU5BO0FBQVYsR0FBUDtBQUNIOztBQUdERyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUUsQ0FDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmUSxHQUhQO0FBcUJMO0FBRUFDLEVBQUFBLE1BdkJLLG9CQXVCSyxDQUVULENBekJJO0FBMkJMQyxFQUFBQSxLQTNCSyxtQkEyQkksQ0FFUixDQTdCSTtBQStCTEMsRUFBQUEsTUEvQkssa0JBK0JHQyxFQS9CSCxFQStCTyxDQUVYO0FBakNJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5jb25zdCBFR0dfQ09VTlQgPSAxNSwgUExBWUVSX0NPVU5UID0gMTI7XHJcbmZ1bmN0aW9uIGFycmF5QnVmZmVyVG9TdHJpbmcoYWIpIHtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIEFycmF5LmZyb20obmV3IFVpbnQ4QXJyYXkoYWIpKSk7XHJcbn1cclxuZnVuY3Rpb24gcmVhZEhlYWRlcih2aWV3KSB7XHJcbiAgICBjb25zdCBmcmFtZUNvdW50ID0gdmlldy5nZXRVaW50MTYoOCwgdHJ1ZSk7XHJcbiAgICBjb25zdCBmcHMgPSB2aWV3LmdldFVpbnQxNigxMCwgdHJ1ZSk7XHJcbiAgICBjb25zdCByZWRTY29yZSA9IHZpZXcuZ2V0VWludDMyKDEyLCB0cnVlKSwgeWVsbG93U2NvcmUgPSB2aWV3LmdldFVpbnQzMigxNiwgdHJ1ZSksIGJsdWVTY29yZSA9IHZpZXcuZ2V0VWludDMyKDIwLCB0cnVlKTtcclxuICAgIGNvbnN0IHRpbWVzdGFtcExlZnQgPSB2aWV3LmdldFVpbnQzMigyNCwgdHJ1ZSksIHRpbWVzdGFtcFJpZ2h0ID0gdmlldy5nZXRVaW50MzIoMjgsIHRydWUpO1xyXG4gICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKCh0aW1lc3RhbXBSaWdodCAqICgyICoqIDMyKSkgKyB0aW1lc3RhbXBMZWZ0KSAqIDEwMDApOyAvLyBzIC0+IG1zXHJcbiAgICAvLyBOT1RFOiBjb2RlIGFib3ZlIGNhbm5vdCBoYW5kbGUgeWVhcnMgPCAxOTcwLCBidXQgaXQgZG9lc24ndCBtYXR0ZXJcclxuICAgIGNvbnN0IGVnZ1Njb3JlcyA9IFtdLCBlZ2dTY29yZXNPZmZzZXQgPSAzMjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgRUdHX0NPVU5UOyBpKyspIHtcclxuICAgICAgICBlZ2dTY29yZXNbaV0gPSB2aWV3LmdldFVpbnQ4KGVnZ1Njb3Jlc09mZnNldCArIGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgZnJhbWVDb3VudCwgZnBzLCByZWRTY29yZSwgeWVsbG93U2NvcmUsXHJcbiAgICAgICAgYmx1ZVNjb3JlLCB0aW1lc3RhbXAsIGVnZ1Njb3JlcyB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlYWRGcmFtZSh2aWV3LCBlZ2dTY29yZXMsIG9mZnNldCkge1xyXG4gICAgY29uc3QgcGxheWVySW5mbyA9IFtdO1xyXG4gICAgY29uc3QgZWdnSW5mbyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8IFBMQVlFUl9DT1VOVDsgaWQrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSB2aWV3LmdldEZsb2F0MzIob2Zmc2V0ICsgMTIwICsgNCAqIGlkLCB0cnVlKSwgeSA9IHZpZXcuZ2V0RmxvYXQzMihvZmZzZXQgKyAxNjggKyA0ICogaWQsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGVuZHVyYW5jZVppcHBlZCA9IHZpZXcuZ2V0VWludDgob2Zmc2V0ICsgMjI4ICsgaWQpO1xyXG4gICAgICAgIHBsYXllckluZm8ucHVzaCh7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogW3gsIHldLFxyXG4gICAgICAgICAgICBlZ2dJbkhhbmQ6IHZpZXcuZ2V0SW50OChvZmZzZXQgKyAyMTYgKyBpZCksXHJcbiAgICAgICAgICAgIGVuZHVyYW5jZTogZW5kdXJhbmNlWmlwcGVkIC8gMjU1LjAgKiA1LjBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGlkID0gMDsgaWQgPCBFR0dfQ09VTlQ7IGlkKyspIHtcclxuICAgICAgICBjb25zdCB4ID0gdmlldy5nZXRGbG9hdDMyKG9mZnNldCArIDQgKiBpZCwgdHJ1ZSksIHkgPSB2aWV3LmdldEZsb2F0MzIob2Zmc2V0ICsgNjAgKyA0ICogaWQsIHRydWUpO1xyXG4gICAgICAgIGVnZ0luZm8ucHVzaCh7XHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogW3gsIHldLFxyXG4gICAgICAgICAgICBzY29yZTogZWdnU2NvcmVzW2lkXVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGxheWVySW5mbywgZWdnSW5mbyB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlYWRGcm9tUmVjb3JkRmlsZShibG9iKSB7XHJcbiAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJsb2IpO1xyXG4gICAgaWYgKGFycmF5QnVmZmVyVG9TdHJpbmcoYmxvYi5zbGljZSgwLCA2KSkgIT09ICdUSEFJRUcnIHx8IHZpZXcuZ2V0VWludDE2KDYsIHRydWUpICE9PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBoZWFkZXIgPSByZWFkSGVhZGVyKHZpZXcpO1xyXG4gICAgY29uc3QgZnJhbWVzID0gW107XHJcbiAgICBjb25zdCBmcmFtZVNpemVJbkJ5dGVzID0gMjQwO1xyXG4gICAgZm9yIChsZXQgZnJhbWVOdW0gPSAwLCBvZmZzZXQgPSA0NzsgZnJhbWVOdW0gPCBoZWFkZXIuZnJhbWVDb3VudDsgZnJhbWVOdW0rKywgb2Zmc2V0ICs9IGZyYW1lU2l6ZUluQnl0ZXMpIHtcclxuICAgICAgICBmcmFtZXMucHVzaChyZWFkRnJhbWUodmlldywgaGVhZGVyLmVnZ1Njb3Jlcywgb2Zmc2V0KSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBoZWFkZXIsIGZyYW1lcyB9O1xyXG59XHJcblxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Eggs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ebe0cy5sdAYKyk6kzLX/a7', 'Eggs');
// Script/Eggs.js

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

function abs(number) {
  return number >= 0 ? number : -number;
}

function min(number_a, number_b) {
  return number_a > number_b ? number_b : number_a;
}

cc.Class({
  "extends": cc.Component,
  properties: {
    containerId: {
      "default": "_filebox_container_",
      visible: false
    },
    inputBoxId: {
      "default": "_filebox_input_",
      visible: false
    },
    isPlaying: {
      "default": false,
      visible: false
    },
    status: {
      "default": -1,
      visible: false
    },
    count: {
      "default": 0,
      type: cc.Integer,
      visible: false
    },
    limitCount: {
      "default": 0,
      type: cc.Integer,
      visible: false
    },
    header: {
      "default": null,
      type: cc.Array,
      visible: false
    },
    frames: {
      "default": null,
      type: cc.Array,
      visible: false
    },
    Player: cc.Prefab,
    players: {
      "default": [],
      type: [cc.Node],
      visible: false
    },
    Egg: cc.Prefab,
    eggs: {
      "default": [],
      type: [cc.Node],
      visible: false
    },
    ground: {
      "default": null,
      type: cc.Node
    },
    YellowImgs: {
      "default": [],
      type: [cc.Texture2D]
    },
    RedImgs: {
      "default": [],
      type: [cc.Texture2D]
    },
    BlueImgs: {
      "default": [],
      type: [cc.Texture2D]
    },
    number: {
      "default": null,
      type: cc.Node
    },
    framelabel: {
      "default": null,
      type: cc.Node
    } // foo: {
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
  // onLoad () {},
  start: function start() {
    this.initInputBox();
  },
  update: function update(dt) {
    if (this.isPlaying) {
      if (this.count < this.limitCount) {
        var frame = this.frames[this.count];
        var playersInfo = frame['playerInfo'];

        for (var i = 0; i < 12; ++i) {
          var id = playersInfo[i]['id'];
          var position = playersInfo[i]['position'];
          var eggInHand = playersInfo[i]['eggInHand'];
          var endurance = playersInfo[i]['endurance']; //console.log(this.players[id]);

          if (this.count > 0) {
            console.log(imgId);
            var imgId = this.playerImgTrans(this.players[id].position, this.positionTrans(position[0], position[1]));

            if (imgId != -1) {
              if (id < 4) {
                this.players[id].children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.RedImgs[imgId]);
              } else if (id > 7) {
                this.players[id].children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.BlueImgs[imgId]);
              } else {
                this.players[id].children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.YellowImgs[imgId]);
              } //console.log(imgId, this.players[id].children[0].spriteFrame);

            }
          } // 更新player位置


          this.players[id].position = this.positionTrans(position[0], position[1]); // 更新耐力显示

          this.players[id].children[2].getComponent(cc.ProgressBar).progress = endurance / 5;
          console.log(this.players[id].children[2]);
        }

        var eggsInfo = frame['eggInfo'];

        for (var _i = 0; _i < 15; ++_i) {
          var _id2 = eggsInfo[_i]['id'];
          var _position = eggsInfo[_i]['position'];
          var score = eggsInfo[_i]['score'];
          this.eggs[_id2].position = this.positionTrans(_position[0], _position[1]);
          this.eggs[_id2].getChildByName('score').getComponent(cc.Label).string = String(score);
        }

        var arr = [];

        for (var _i2 = 0; _i2 < 12; ++_i2) {
          arr.push(this.players[_i2]);
        }

        for (var _i3 = 0; _i3 < 15; ++_i3) {
          arr.push(this.eggs[_i3]);
        }

        arr.sort(function (a, b) {
          return b.y - a.y;
        });

        for (var _i4 = 0; _i4 < 27; ++_i4) {
          arr[_i4].zIndex = _i4;
        }

        console.log(this.count);
        this.framelabel.getComponent(cc.Label).string = "当前帧: " + String(this.count);
        this.count = this.count + 1;
      }
    }
  },
  step: function step() {
    this.limitCount = min(this.limitCount + 1, this.header['frameCount']);
  },
  startSetp: function startSetp() {
    this.limitCount = this.count;
  },
  "continue": function _continue() {
    this.limitCount = this.header['frameCount'];
  },
  restart: function restart() {
    this.count = 0;
    this.limitCount = 1;
  },
  skipTo: function skipTo() {
    var num_str = this.number.getComponent(cc.EditBox).string;
    var num = 0;

    if (Number(num_str) != NaN) {
      num = min(Number(num_str), this.header['frameCount'] - 1);
    } else {
      this.number.getComponent(cc.EditBox).string = "0";
    }

    this.count = num;
    this.limitCount = num + 1;
  },
  InitGPE: function InitGPE() {
    var CanvasNode = cc.find('Canvas');

    for (var i = 0; i < 12; ++i) {
      this.players.push(cc.instantiate(this.Player));
      this.players[i].getChildByName('id').getComponent(cc.Label).string = String(i);

      if (i < 4) {
        this.players[i].getChildByName('img').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.RedImgs[0]);
      } else if (i > 7) {
        this.players[i].getChildByName('img').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.BlueImgs[0]);
      } else {
        this.players[i].getChildByName('img').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.YellowImgs[0]);
      }

      CanvasNode.addChild(this.players[i]); //设置帧率

      cc.game.setFrameRate(this.header['fps']);
    }

    for (var _i5 = 0; _i5 < 15; ++_i5) {
      this.eggs.push(cc.instantiate(this.Egg));
      this.eggs[_i5].getChildByName('id').getComponent(cc.Label).string = String(_i5);
      CanvasNode.addChild(this.eggs[_i5]);
    }

    this.isPlaying = true;
    this.limitCount = 0;
  },
  initInputBox: function initInputBox() {
    var _this = this;

    var inputBox = this.getInputBox(this.inputBoxId, this.containerId);

    if (inputBox) {
      inputBox.onchange = function (evt) {
        //console.info("===> input value change: ", evt);
        var fileList = evt.target.files; //console.info("===> file list: ", fileList);
        //console.info("===> value: ", inputBox.value);

        var file = fileList[0];

        if (!file) {
          //console.info("===> No file selected");
          return;
        }

        _this.readFile(file, function (blob) {
          var res = readFromRecordFile(blob);
          _this.header = res['header'];
          _this.frames = res['frames'];
          console.log(_this.frames);

          _this.InitGPE();
        });
      };
    } else {
      console.warn("Can't get or create input box");
    }
  },
  getInputBox: function getInputBox(inputBoxId, containerId) {
    if (!this.inputBox) {
      var inputBox = document.getElementById(inputBoxId);

      if (!inputBox) {
        var container = document.getElementById(containerId);

        if (!container) {
          container = document.createElement('div');
          document.body.appendChild(container);
          container.id = containerId;
        }

        inputBox = document.createElement("input");
        inputBox.id = inputBoxId;
        inputBox.type = "file";
        container.appendChild(inputBox);
      }

      this.inputBox = inputBox;
    }

    return this.inputBox;
  },
  onClick: function onClick() {
    if (this.inputBox) {
      //console.info("click start");
      this.inputBox.click(); //console.info("click done");
    }
  },
  readFile: function readFile(fileUrl, callback) {
    //console.log(fileUrl);
    var reader = new FileReader();

    reader.onload = function (e) {
      var content = e.target.result; // Display file content
      //console.info("===> file content: ", content);

      callback(content);
    };

    reader.readAsArrayBuffer(fileUrl);
  },
  positionTrans: function positionTrans(x, y) {
    x = x * 12 + this.ground.x + 33.48; //偏差调整

    y = y * 12 + this.ground.y - 3.5; //偏差调整

    return cc.v2(x, y);
  },
  playerImgTrans: function playerImgTrans(last_position, position) {
    console.log(last_position, position);

    if (last_position.y == position.y && last_position.x == position.x) {
      return -1;
    }

    if (abs(last_position.y - position.y) > abs(last_position.x - position.x)) {
      return last_position.y > position.y ? 0 : 1;
    } else {
      return last_position.x > position.x ? 2 : 3;
    }
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvRWdncy5qcyJdLCJuYW1lcyI6WyJFR0dfQ09VTlQiLCJQTEFZRVJfQ09VTlQiLCJhcnJheUJ1ZmZlclRvU3RyaW5nIiwiYWIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsIkFycmF5IiwiZnJvbSIsIlVpbnQ4QXJyYXkiLCJyZWFkSGVhZGVyIiwidmlldyIsImZyYW1lQ291bnQiLCJnZXRVaW50MTYiLCJmcHMiLCJyZWRTY29yZSIsImdldFVpbnQzMiIsInllbGxvd1Njb3JlIiwiYmx1ZVNjb3JlIiwidGltZXN0YW1wTGVmdCIsInRpbWVzdGFtcFJpZ2h0IiwidGltZXN0YW1wIiwiRGF0ZSIsImVnZ1Njb3JlcyIsImVnZ1Njb3Jlc09mZnNldCIsImkiLCJnZXRVaW50OCIsInJlYWRGcmFtZSIsIm9mZnNldCIsInBsYXllckluZm8iLCJlZ2dJbmZvIiwiaWQiLCJ4IiwiZ2V0RmxvYXQzMiIsInkiLCJlbmR1cmFuY2VaaXBwZWQiLCJwdXNoIiwicG9zaXRpb24iLCJlZ2dJbkhhbmQiLCJnZXRJbnQ4IiwiZW5kdXJhbmNlIiwic2NvcmUiLCJyZWFkRnJvbVJlY29yZEZpbGUiLCJibG9iIiwiRGF0YVZpZXciLCJzbGljZSIsImhlYWRlciIsImZyYW1lcyIsImZyYW1lU2l6ZUluQnl0ZXMiLCJmcmFtZU51bSIsImFicyIsIm51bWJlciIsIm1pbiIsIm51bWJlcl9hIiwibnVtYmVyX2IiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImNvbnRhaW5lcklkIiwidmlzaWJsZSIsImlucHV0Qm94SWQiLCJpc1BsYXlpbmciLCJzdGF0dXMiLCJjb3VudCIsInR5cGUiLCJJbnRlZ2VyIiwibGltaXRDb3VudCIsIlBsYXllciIsIlByZWZhYiIsInBsYXllcnMiLCJOb2RlIiwiRWdnIiwiZWdncyIsImdyb3VuZCIsIlllbGxvd0ltZ3MiLCJUZXh0dXJlMkQiLCJSZWRJbWdzIiwiQmx1ZUltZ3MiLCJmcmFtZWxhYmVsIiwic3RhcnQiLCJpbml0SW5wdXRCb3giLCJ1cGRhdGUiLCJkdCIsImZyYW1lIiwicGxheWVyc0luZm8iLCJjb25zb2xlIiwibG9nIiwiaW1nSWQiLCJwbGF5ZXJJbWdUcmFucyIsInBvc2l0aW9uVHJhbnMiLCJjaGlsZHJlbiIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJQcm9ncmVzc0JhciIsInByb2dyZXNzIiwiZWdnc0luZm8iLCJnZXRDaGlsZEJ5TmFtZSIsIkxhYmVsIiwic3RyaW5nIiwiYXJyIiwic29ydCIsImEiLCJiIiwiekluZGV4Iiwic3RlcCIsInN0YXJ0U2V0cCIsInJlc3RhcnQiLCJza2lwVG8iLCJudW1fc3RyIiwiRWRpdEJveCIsIm51bSIsIk51bWJlciIsIk5hTiIsIkluaXRHUEUiLCJDYW52YXNOb2RlIiwiZmluZCIsImluc3RhbnRpYXRlIiwiYWRkQ2hpbGQiLCJnYW1lIiwic2V0RnJhbWVSYXRlIiwiaW5wdXRCb3giLCJnZXRJbnB1dEJveCIsIm9uY2hhbmdlIiwiZXZ0IiwiZmlsZUxpc3QiLCJ0YXJnZXQiLCJmaWxlcyIsImZpbGUiLCJyZWFkRmlsZSIsInJlcyIsIndhcm4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIm9uQ2xpY2siLCJjbGljayIsImZpbGVVcmwiLCJjYWxsYmFjayIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwiY29udGVudCIsInJlc3VsdCIsInJlYWRBc0FycmF5QnVmZmVyIiwidjIiLCJsYXN0X3Bvc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLFNBQVMsR0FBRyxFQUFsQjtBQUFBLElBQXNCQyxZQUFZLEdBQUcsRUFBckM7O0FBQ0EsU0FBU0MsbUJBQVQsQ0FBNkJDLEVBQTdCLEVB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QkssUUFBUSxDQUFDTCxDQUEzQixHQUErQixDQUEvQixHQUFtQyxDQUExQztBQUNIO0FBQ0o7QUF6VEksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbmNvbnN0IEVHR19DT1VOVCA9IDE1LCBQTEFZRVJfQ09VTlQgPSAxMjtcclxuZnVuY3Rpb24gYXJyYXlCdWZmZXJUb1N0cmluZyhhYikge1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgQXJyYXkuZnJvbShuZXcgVWludDhBcnJheShhYikpKTtcclxufVxyXG5mdW5jdGlvbiByZWFkSGVhZGVyKHZpZXcpIHtcclxuICAgIGNvbnN0IGZyYW1lQ291bnQgPSB2aWV3LmdldFVpbnQxNig4LCB0cnVlKTtcclxuICAgIGNvbnN0IGZwcyA9IHZpZXcuZ2V0VWludDE2KDEwLCB0cnVlKTtcclxuICAgIGNvbnN0IHJlZFNjb3JlID0gdmlldy5nZXRVaW50MzIoMTIsIHRydWUpLCB5ZWxsb3dTY29yZSA9IHZpZXcuZ2V0VWludDMyKDE2LCB0cnVlKSwgYmx1ZVNjb3JlID0gdmlldy5nZXRVaW50MzIoMjAsIHRydWUpO1xyXG4gICAgY29uc3QgdGltZXN0YW1wTGVmdCA9IHZpZXcuZ2V0VWludDMyKDI0LCB0cnVlKSwgdGltZXN0YW1wUmlnaHQgPSB2aWV3LmdldFVpbnQzMigyOCwgdHJ1ZSk7XHJcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgoKHRpbWVzdGFtcFJpZ2h0ICogKDIgKiogMzIpKSArIHRpbWVzdGFtcExlZnQpICogMTAwMCk7IC8vIHMgLT4gbXNcclxuICAgIC8vIE5PVEU6IGNvZGUgYWJvdmUgY2Fubm90IGhhbmRsZSB5ZWFycyA8IDE5NzAsIGJ1dCBpdCBkb2Vzbid0IG1hdHRlclxyXG4gICAgY29uc3QgZWdnU2NvcmVzID0gW10sIGVnZ1Njb3Jlc09mZnNldCA9IDMyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFR0dfQ09VTlQ7IGkrKykge1xyXG4gICAgICAgIGVnZ1Njb3Jlc1tpXSA9IHZpZXcuZ2V0VWludDgoZWdnU2NvcmVzT2Zmc2V0ICsgaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBmcmFtZUNvdW50LCBmcHMsIHJlZFNjb3JlLCB5ZWxsb3dTY29yZSxcclxuICAgICAgICBibHVlU2NvcmUsIHRpbWVzdGFtcCwgZWdnU2NvcmVzIH07XHJcbn1cclxuZnVuY3Rpb24gcmVhZEZyYW1lKHZpZXcsIGVnZ1Njb3Jlcywgb2Zmc2V0KSB7XHJcbiAgICBjb25zdCBwbGF5ZXJJbmZvID0gW107XHJcbiAgICBjb25zdCBlZ2dJbmZvID0gW107XHJcbiAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDwgUExBWUVSX0NPVU5UOyBpZCsrKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IHZpZXcuZ2V0RmxvYXQzMihvZmZzZXQgKyAxMjAgKyA0ICogaWQsIHRydWUpLCB5ID0gdmlldy5nZXRGbG9hdDMyKG9mZnNldCArIDE2OCArIDQgKiBpZCwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgZW5kdXJhbmNlWmlwcGVkID0gdmlldy5nZXRVaW50OChvZmZzZXQgKyAyMjggKyBpZCk7XHJcbiAgICAgICAgcGxheWVySW5mby5wdXNoKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBbeCwgeV0sXHJcbiAgICAgICAgICAgIGVnZ0luSGFuZDogdmlldy5nZXRJbnQ4KG9mZnNldCArIDIxNiArIGlkKSxcclxuICAgICAgICAgICAgZW5kdXJhbmNlOiBlbmR1cmFuY2VaaXBwZWQgLyAyNTUuMCAqIDUuMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8IEVHR19DT1VOVDsgaWQrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSB2aWV3LmdldEZsb2F0MzIob2Zmc2V0ICsgNCAqIGlkLCB0cnVlKSwgeSA9IHZpZXcuZ2V0RmxvYXQzMihvZmZzZXQgKyA2MCArIDQgKiBpZCwgdHJ1ZSk7XHJcbiAgICAgICAgZWdnSW5mby5wdXNoKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBbeCwgeV0sXHJcbiAgICAgICAgICAgIHNjb3JlOiBlZ2dTY29yZXNbaWRdXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBwbGF5ZXJJbmZvLCBlZ2dJbmZvIH07XHJcbn1cclxuZnVuY3Rpb24gcmVhZEZyb21SZWNvcmRGaWxlKGJsb2IpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYmxvYik7XHJcbiAgICBpZiAoYXJyYXlCdWZmZXJUb1N0cmluZyhibG9iLnNsaWNlKDAsIDYpKSAhPT0gJ1RIQUlFRycgfHwgdmlldy5nZXRVaW50MTYoNiwgdHJ1ZSkgIT09IDEpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IGhlYWRlciA9IHJlYWRIZWFkZXIodmlldyk7XHJcbiAgICBjb25zdCBmcmFtZXMgPSBbXTtcclxuICAgIGNvbnN0IGZyYW1lU2l6ZUluQnl0ZXMgPSAyNDA7XHJcbiAgICBmb3IgKGxldCBmcmFtZU51bSA9IDAsIG9mZnNldCA9IDQ3OyBmcmFtZU51bSA8IGhlYWRlci5mcmFtZUNvdW50OyBmcmFtZU51bSsrLCBvZmZzZXQgKz0gZnJhbWVTaXplSW5CeXRlcykge1xyXG4gICAgICAgIGZyYW1lcy5wdXNoKHJlYWRGcmFtZSh2aWV3LCBoZWFkZXIuZWdnU2NvcmVzLCBvZmZzZXQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IGhlYWRlciwgZnJhbWVzIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFicyhudW1iZXIpIHtcclxuICAgIHJldHVybiBudW1iZXIgPj0gMCA/IG51bWJlciA6IC1udW1iZXI7XHJcbn1cclxuZnVuY3Rpb24gbWluKG51bWJlcl9hLCBudW1iZXJfYikge1xyXG4gICAgcmV0dXJuIG51bWJlcl9hID4gbnVtYmVyX2IgPyBudW1iZXJfYiA6IG51bWJlcl9hO1xyXG59XHJcblxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBjb250YWluZXJJZCA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJfZmlsZWJveF9jb250YWluZXJfXCIsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRCb3hJZCA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogXCJfZmlsZWJveF9pbnB1dF9cIixcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1BsYXlpbmcgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXR1cyA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogLTEsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY291bnQgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGltaXRDb3VudCA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogMCxcclxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZWFkZXIgOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkFycmF5LFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZyYW1lcyA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuQXJyYXksXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgUGxheWVyOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgcGxheWVyczoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVnZyA6IGNjLlByZWZhYixcclxuICAgICAgICBlZ2dzOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ3JvdW5kOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBZZWxsb3dJbWdzIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlRleHR1cmUyRF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBSZWRJbWdzIDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdHlwZTogW2NjLlRleHR1cmUyRF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBCbHVlSW1ncyA6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogW10sXHJcbiAgICAgICAgICAgIHR5cGU6IFtjYy5UZXh0dXJlMkRdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnVtYmVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmcmFtZWxhYmVsOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmluaXRJbnB1dEJveCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYodGhpcy5pc1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb3VudCA8IHRoaXMubGltaXRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5mcmFtZXNbdGhpcy5jb3VudF07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllcnNJbmZvID0gZnJhbWVbJ3BsYXllckluZm8nXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gcGxheWVyc0luZm9baV1bJ2lkJ107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gcGxheWVyc0luZm9baV1bJ3Bvc2l0aW9uJ107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVnZ0luSGFuZCA9IHBsYXllcnNJbmZvW2ldWydlZ2dJbkhhbmQnXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kdXJhbmNlID0gcGxheWVyc0luZm9baV1bJ2VuZHVyYW5jZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy5wbGF5ZXJzW2lkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaW1nSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nSWQgPSB0aGlzLnBsYXllckltZ1RyYW5zKHRoaXMucGxheWVyc1tpZF0ucG9zaXRpb24sIHRoaXMucG9zaXRpb25UcmFucyhwb3NpdGlvblswXSwgcG9zaXRpb25bMV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaW1nSWQgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlkIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGhpcy5SZWRJbWdzW2ltZ0lkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlkID4gNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0uY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGhpcy5CbHVlSW1nc1tpbWdJZF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2lkXS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0aGlzLlllbGxvd0ltZ3NbaW1nSWRdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW1nSWQsIHRoaXMucGxheWVyc1tpZF0uY2hpbGRyZW5bMF0uc3ByaXRlRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOabtOaWsHBsYXllcuS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpZF0ucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uVHJhbnMocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmm7TmlrDogJDlipvmmL7npLpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbaWRdLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBlbmR1cmFuY2UgLyA1O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucGxheWVyc1tpZF0uY2hpbGRyZW5bMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBlZ2dzSW5mbyA9IGZyYW1lWydlZ2dJbmZvJ107XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTU7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZCA9IGVnZ3NJbmZvW2ldWydpZCddO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGVnZ3NJbmZvW2ldWydwb3NpdGlvbiddO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IGVnZ3NJbmZvW2ldWydzY29yZSddO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWdnc1tpZF0ucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uVHJhbnMocG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVnZ3NbaWRdLmdldENoaWxkQnlOYW1lKCdzY29yZScpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKHNjb3JlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEyOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLnBsYXllcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDE1OyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmVnZ3NbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJyLnNvcnQoKGEsIGIpID0+IHtyZXR1cm4gYi55IC0gYS55fSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjc7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXS56SW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY291bnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuW9k+WJjeW4pzogXCIgKyBTdHJpbmcodGhpcy5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50ID0gdGhpcy5jb3VudCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGVwKCkge1xyXG4gICAgICAgIHRoaXMubGltaXRDb3VudCA9IG1pbih0aGlzLmxpbWl0Q291bnQgKyAxLCB0aGlzLmhlYWRlclsnZnJhbWVDb3VudCddKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRTZXRwKCkge1xyXG4gICAgICAgIHRoaXMubGltaXRDb3VudCA9IHRoaXMuY291bnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbnRpbnVlKCkge1xyXG4gICAgICAgIHRoaXMubGltaXRDb3VudCA9IHRoaXMuaGVhZGVyWydmcmFtZUNvdW50J107XHJcbiAgICB9LFxyXG5cclxuICAgIHJlc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5saW1pdENvdW50ID0gMTtcclxuICAgIH0sXHJcblxyXG4gICAgc2tpcFRvKCkge1xyXG4gICAgICAgIGxldCBudW1fc3RyID0gdGhpcy5udW1iZXIuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpLnN0cmluZztcclxuICAgICAgICBsZXQgbnVtID0gMDtcclxuICAgICAgICBpZihOdW1iZXIobnVtX3N0cikgIT0gTmFOKSB7XHJcbiAgICAgICAgICAgIG51bSA9IG1pbihOdW1iZXIobnVtX3N0ciksIHRoaXMuaGVhZGVyWydmcmFtZUNvdW50J10gLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubnVtYmVyLmdldENvbXBvbmVudChjYy5FZGl0Qm94KS5zdHJpbmcgPSBcIjBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb3VudCA9IG51bTtcclxuICAgICAgICB0aGlzLmxpbWl0Q291bnQgPSBudW0gKyAxO1xyXG4gICAgfSxcclxuXHJcbiAgICBJbml0R1BFKCkge1xyXG4gICAgICAgIHZhciBDYW52YXNOb2RlID0gY2MuZmluZCgnQ2FudmFzJyk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEyOyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnB1c2goY2MuaW5zdGFudGlhdGUodGhpcy5QbGF5ZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2ldLmdldENoaWxkQnlOYW1lKCdpZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKGkpO1xyXG4gICAgICAgICAgICBpZihpIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2ldLmdldENoaWxkQnlOYW1lKCdpbWcnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0aGlzLlJlZEltZ3NbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoaSA+IDcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpXS5nZXRDaGlsZEJ5TmFtZSgnaW1nJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGhpcy5CbHVlSW1nc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbaV0uZ2V0Q2hpbGRCeU5hbWUoJ2ltZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMuWWVsbG93SW1nc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ2FudmFzTm9kZS5hZGRDaGlsZCh0aGlzLnBsYXllcnNbaV0pO1xyXG5cclxuICAgICAgICAgICAgLy/orr7nva7luKfnjodcclxuICAgICAgICAgICAgY2MuZ2FtZS5zZXRGcmFtZVJhdGUodGhpcy5oZWFkZXJbJ2ZwcyddKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDE1OyArK2kpIHtcclxuICAgICAgICAgICAgdGhpcy5lZ2dzLnB1c2goY2MuaW5zdGFudGlhdGUodGhpcy5FZ2cpKTtcclxuICAgICAgICAgICAgdGhpcy5lZ2dzW2ldLmdldENoaWxkQnlOYW1lKCdpZCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gU3RyaW5nKGkpO1xyXG4gICAgICAgICAgICBDYW52YXNOb2RlLmFkZENoaWxkKHRoaXMuZWdnc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5saW1pdENvdW50ID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdElucHV0Qm94KCkge1xyXG4gICAgICAgIGxldCBpbnB1dEJveCA9IHRoaXMuZ2V0SW5wdXRCb3godGhpcy5pbnB1dEJveElkLCB0aGlzLmNvbnRhaW5lcklkKTtcclxuICAgICAgICBpZihpbnB1dEJveCkge1xyXG4gICAgICAgICAgICBpbnB1dEJveC5vbmNoYW5nZSA9IChldnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKFwiPT09PiBpbnB1dCB2YWx1ZSBjaGFuZ2U6IFwiLCBldnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZUxpc3QgPSBldnQudGFyZ2V0LmZpbGVzO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oXCI9PT0+IGZpbGUgbGlzdDogXCIsIGZpbGVMaXN0KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKFwiPT09PiB2YWx1ZTogXCIsIGlucHV0Qm94LnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVMaXN0WzBdO1xyXG4gICAgICAgICAgICAgICAgaWYoIWZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUuaW5mbyhcIj09PT4gTm8gZmlsZSBzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRGaWxlKGZpbGUsIChibG9iKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlcyA9IHJlYWRGcm9tUmVjb3JkRmlsZShibG9iKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlciA9IHJlc1snaGVhZGVyJ107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmFtZXMgPSByZXNbJ2ZyYW1lcyddO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZnJhbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkluaXRHUEUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJDYW4ndCBnZXQgb3IgY3JlYXRlIGlucHV0IGJveFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdldElucHV0Qm94KGlucHV0Qm94SWQsIGNvbnRhaW5lcklkKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuaW5wdXRCb3gpIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXRCb3hJZCk7XHJcbiAgICAgICAgICAgIGlmKCFpbnB1dEJveCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcklkKTtcclxuICAgICAgICAgICAgICAgIGlmKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmlkID0gY29udGFpbmVySWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXRCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dEJveC5pZCA9IGlucHV0Qm94SWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaW5wdXRCb3gudHlwZSA9IFwiZmlsZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbnB1dEJveCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbnB1dEJveCA9IGlucHV0Qm94O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dEJveDtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uQ2xpY2soKSB7XHJcbiAgICAgICAgaWYodGhpcy5pbnB1dEJveCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUuaW5mbyhcImNsaWNrIHN0YXJ0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0Qm94LmNsaWNrKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKFwiY2xpY2sgZG9uZVwiKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZWFkRmlsZShmaWxlVXJsLCBjYWxsYmFjaykge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZmlsZVVybCk7XHJcbiAgICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vIERpc3BsYXkgZmlsZSBjb250ZW50XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKFwiPT09PiBmaWxlIGNvbnRlbnQ6IFwiLCBjb250ZW50KTtcclxuICAgICAgICAgICAgY2FsbGJhY2soY29udGVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZVVybCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHBvc2l0aW9uVHJhbnMoeCwgeSkge1xyXG4gICAgICAgIHggPSB4ICogMTIgICsgdGhpcy5ncm91bmQueCArIDMzLjQ4Oy8v5YGP5beu6LCD5pW0XHJcbiAgICAgICAgeSA9IHkgKiAxMiAgKyB0aGlzLmdyb3VuZC55IC0gMy41Oy8v5YGP5beu6LCD5pW0XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBwbGF5ZXJJbWdUcmFucyhsYXN0X3Bvc2l0aW9uLCBwb3NpdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxhc3RfcG9zaXRpb24sIHBvc2l0aW9uKTtcclxuICAgICAgICBpZihsYXN0X3Bvc2l0aW9uLnkgPT0gcG9zaXRpb24ueSAmJiBsYXN0X3Bvc2l0aW9uLnggPT0gcG9zaXRpb24ueCkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFicyhsYXN0X3Bvc2l0aW9uLnkgLSBwb3NpdGlvbi55KSA+IGFicyhsYXN0X3Bvc2l0aW9uLnggLSBwb3NpdGlvbi54KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdF9wb3NpdGlvbi55ID4gcG9zaXRpb24ueSA/IDAgOiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RfcG9zaXRpb24ueCA+IHBvc2l0aW9uLnggPyAyIDogMztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG4iXX0=
//------QC-SOURCE-SPLIT------
