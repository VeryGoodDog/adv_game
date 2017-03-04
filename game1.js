var lastCommand = {'count':0, 'list':['']};
var player = {"status":"alive"}
var commands =
{
  "vldCmds":[
    "start",
    "fight",
    "adv",
    "yes",
    "no",
    "far",
    "close"
  ],
  "start":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "text":"wanna game?",
    "out1":"good",
    "out2":"bad",
    "require":"met",
    "after":"fight",
    "completed":false
  },
  "fight":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "text":"wanna fight?",
    "out1":"you win",
    "out2":"you lose",
    "require":"start",
    "after":"adv",
    "completed":false
  },
  "adv":{
    "type":"quest",
    "op1":"far",
    "op2":"close",
    "text":"wanna adventure?",
    "out1":"you died...",
    "out2":"you lived",
    "require":"fight",
    "after":"none",
    "completed":false
  },
  "yes":{
    "type":"response"
  },
  "no":{
    "type":"response"
  },
  "far":{
    "type":"response"
  },
  "close":{
    "type":"response"
  }
};

addToOutput('');

$('#commandLine').keyup(function(event) {
  if (event.key === 'Enter' && lastCommand.recent !== '') {
    lastCommand.recent = getCleanInput();
    console.log(lastCommand.recent);
    clearInput();
    if (lastCommand.recent != 'invalid command') {
      addToOutput(lastCommand.recent);
      addToCommandList(lastCommand.recent);
      questContr(lastCommand.recent);
    } else {
      return;
    }
  }
});

function debug() {
  console.log('------');
  console.log(lastCommand);
  console.log('------');
  console.log(commands);
  console.log('------');
  console.log(pc());

}

function addToCommandList(input) {
  lastCommand.count++;
  lastCommand.list[lastCommand.count] = input;
}

function getCleanInput() {
  var temp = $('#commandLine').val().trim().toLowerCase();
  for (var i = 0; i < commands.vldCmds.length; i++) {
    if (commands.vldCmds[i] === temp) {
      return temp;
    }
  }
  return 'invalid command';
}

function addToOutput(input) {
  $('#output').prepend('\n'+input + '\n');
  return;
}

function clearInput() {
  $('#commandLine').val('');
}

function clearOutput() {
  $('#output').val('');
}

function pc() {
  if (lastCommand.list[lastCommand.count-1]) {
    return lastCommand.list[lastCommand.count-1];
  } else {
    return lastCommand.recent;
  }

}

function questContr(s) {
  if (pc() && (commands[s].type === 'quest' || commands[s].type === 'response')) {
    console.log(commands[s].completed);
    if (commands[s].completed === true) {
      addToOutput('you already did')
      return;
    } else if (commands[s].require === 'met') {
      addToOutput(commands[s].text+'\n'+commands[s].op1+' '+commands[s].op2);
      return;
    } else if (commands[pc()].op1 === s) {
      op1Contr(pc());
    } else if (commands[pc()].op2 === s) {
      op2Contr(pc());
    } else if (commands[commands[s].require].completed === false) {
      addToOutput('you need to complete: ' + commands[s].require);
      return;
    } else {
      addToOutput('error');
    }
  }
}

function op1Contr(s) {
  switch (s) {
    case 'start':
      genop1(s);
    break;
    case 'fight':
      fightop1();
    break;
    case 'adv':
      advop1();
    break;
    default:
    addToOutput('error');

  }
}

function op2Contr(s) {
  switch (s) {
    case 'start':
      genop2(s);
    break;
    case 'fight':
      fightop2();
    break;
    case 'adv':
      advop2();
    break;
    default:
    addToOutput('error');
  }
}

function genop1(s) {
  addToOutput(commands[s].out1);
  commands[s].completed = true;
  addToOutput('now you can complete: '+commands[s].after)
  commands[commands[s].after].require = 'met';
  return;
}

function genop2(s) {
  addToOutput(commands[s].out2);
  return;
}

function fightop1() {
  addToOutput(commands['fight'].out1);
  commands['fight'].completed = true;
  addToOutput('now you can complete: '+commands['fight'].after)
  commands[commands['fight'].after].require = 'met';
  return;
}

function fightop2() {
  addToOutput(commands['fight'].out2);
  return;
}

function advop1() {
  addToOutput(commands['adv'].out1);
  commands['adv'].completed = true;
  addToOutput('now you can complete: '+commands['adv'].after)
  return;
}

function advop2() {
  addToOutput(commands['adv'].out2);
  return;
}
