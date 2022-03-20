"use strict";
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