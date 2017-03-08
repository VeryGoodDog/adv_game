var lastCommand = {'count':0, 'list':['']};
var player = {"health":[10,10],"coords":[1,1],"speed":1}
var messages = {
  "general":{
    "invalidCommand":"invalid command",
    "starter":"type start or help to begin",
    "questCompleted":"you can now ",
    "error":"error",
    "questIncomplete":"you need to complete: ",
    "questAlreadyCompleted":"you already ",
    "health":"your health is now ",
    "death":"you died",
    "dead":"you are dead",
  },
  "start":{
    "text":"wanna start?",
    "out1":"sick",
    "out2":":("
  },
  "fight":{
    "text":"wanna fight?",
    "out1":"you won",
    "out2":"you lost",
    "fightCount":"you fought x",
    "fightEnd":"you have fought enough to be feared"
  },
  "adv":{
    "text":"wanna adventure?",
    "out1":"you lived",
    "out2":"you didnt escape"
  }
}
var commands =
{
  "vldCmds":[
    "start",
    "fight",
    "adv",
    "heal",
    "help",
    "yes",
    "no",
    "far",
    "close",
    "up",
    "right",
    "down",
    "left"
  ],
  "start":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "require":"met",
    "after":["fight","adv"],
    "completed":false,
    "description":"start your quest"
  },
  "fight":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "require":"start",
    "after":["none"],
    "completed":false,
    "description":"fight enemies",
    "fightCount":0,
  },
  "adv":{
    "type":"quest",
    "op1":"far",
    "op2":"close",
    "require":"start",
    "after":["none"],
    "completed":false,
    "active":false,
    "description":"adventure in to wild lands"
  },
  "help":{
    "type":"gen",
    "active":false,
    "description":"brings this help up"
  },
  "heal":{
    "type":"gen",
    "description":"heals you"
  },
  "yes":{
    "type":"response",
    "description":"confirms last command"
  },
  "no":{
    "type":"response",
    "description":"denies last commands"
  },
  "far":{
    "type":"response",
    "description":"adventure command"
  },
  "close":{
    "type":"response",
    "description":"adventure command"
  },
  "up":{
    "type":"response",
    "description":"adventure command"
  },
  "right":{
    "type":"response",
    "description":"adventure command"
  },
  "down":{
    "type":"response",
    "description":"adventure command"
  },
  "left":{
    "type":"response",
    "description":"adventure command"
  }
};

var advMap =
{
  "basic":
  {
    "finish":[0,0]
  }
}
