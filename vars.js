var lastCommand = {'count':0, 'list':['']};
var player = {"health":[10,10],"lowHealth":4,"coords":[0,0],"speed":1,"destination":"finish"}
var messages = {
  "general":{
    "invalidCommand":"invalid command",
    "starter":"enter the town or get help to begin",
    "questCompleted":"you can now ",
    "error":"error",
    "cantDo":"you cant do that now",
    "questIncomplete":"you need to complete: ",
    "questAlreadyCompleted":"you already ",
    "health":"your health is now ",
    "death":"you died",
    "dead":"you are dead",
    "reach":"you have reached ",
    "lowHealth":"you must heal"
  },
  "entertown":{
    "text":"wanna enter the town?",
    "out1":"there is a warm welcome",
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
  },
  "lookingfor":{
    "text":"what are you looking for?",
    "out1":"you are looking for a way out",
    "out2":"you are looking for enemies"
  }
}
var commands =
{
  "vldCmds":[
    "entertown",
    "fight",
    "adv",
    "lookingfor",
    "distance",
    "speedup",
    "slowdown",
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
    "awayout",
    "enemies"
  ],
  "entertown":{
    "type":"gen",
    "require":"met",
    "after":["fight"],
    "completed":false,
    "description":"start your quest"
  },
  "fight":{
    "type":"gen",
    "require":"entertown",
    "after":["lookingfor"],
    "completed":false,
    "description":"fight enemies",
    "fightCount":0,
  },
  "adv":{
    "type":"quest",
    "op1":"far",
    "op2":"close",
    "require":"lookingfor",
    "after":["none"],
    "completed":false,
    "active":false,
    "description":"adventure in to wild lands"
  },
  "lookingfor":{
    "type":"quest",
    "op1":"awayout",
    "op2":"enemies",
    "require":"fight",
    "after":["adv"],
    "completed":false,
    "description":"what are you looking for?"
  },
  "distance":{
    "type":"gen",
    "description":"distance to finish"
  },
  "speedup":{
    "type":"gen",
    "description":"speed up"
  },
  "slowdown":{
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
  "awayout":{
    "type":"response",
    "description":"adventure command"
  },
  "enemies":{
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
    "finish":[0,0],
    "enemies":{"0":[1,1]}
  }
}
