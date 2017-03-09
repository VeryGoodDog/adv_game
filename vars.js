var lastCommand = {'count':0, 'list':['']};
var player = {"health":[10,10],"lowHealth":4,"coords":[0,0],"speed":1,"destination":"finish"}
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
    "reachFinish":"you have reached the end",
    "lowHealth":"you must heal"
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
    "fightCount":"you won x",
    "fightEnd":"you have fought enough to be feared, people dont really like you"
  },
  "adv":{
    "text":"wanna adventure?",
    "out1":"you must run",
    "out2":"you didnt escape",
    "advActive":"you cant do that now (use 'up' 'down' 'left' 'right' to move)",
    "advGoalDistance":"you are this far from the end "
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
    "left",
    "distance",
    "speed up",
    "slow down"
  ],
  "start":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "require":"met",
    "after":["fight"],
    "completed":false,
    "description":"start your quest"
  },
  "fight":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "require":"start",
    "after":["adv"],
    "completed":false,
    "description":"fight enemies",
    "fightCount":0,
  },
  "adv":{
    "type":"quest",
    "op1":"far",
    "op2":"close",
    "require":"fight",
    "after":["none"],
    "completed":false,
    "active":false,
    "description":"adventure in to wild lands"
  },
  "distance":{
    "type":"gen",
    "description":"distance to finish"
  },
  "speed up":{
    "type":"gen",
    "description":"speed up"
  },
  "slow down":{
    "type":"gen",
    "description":"slow down"
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
  "map":
  {
    "finish":[0,0]
  },
  "dist":0
}
