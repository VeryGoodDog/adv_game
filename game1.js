var lastCommand = {'count':0, 'list':['']};

var commands =
{
  "vldCmds":[
    "start",
    "fight",
    "yes",
    "no"
  ],
  "start":{
    "type":"quest",
    "op1":"yes",
    "op2":"no",
    "text":"wanna game?\nyes or no",
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
    "text":"wanna fight?\nyes or no",
    "out1":"you win",
    "out2":"you lose",
    "require":"start",
    "after":"none",
    "completed":false
  },
  "yes":{
    "type":"response"
  },
  "no":{
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
      commandContr(lastCommand.recent);
    } else {
      return;
    }
  }
});

function debug() {
  console.log(lastCommand);
  console.log(commands);
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
}

function addToOutput(input) {
  $('#output').prepend(input + '\n');
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

// function getCommands() {
//   $.getJSON("commands.json", function(data) {
//     console.log(data);
//   });
// }



function commandContr(s) {
    if (pc() && (commands[s].type === 'quest' || commands[s].type === 'response')) {
      questContr(s);
      return;
    }
}

function questContr(s) {
  if (commands[s].require === 'met') {
    console.log('active');
    addToOutput(commands[s].text+'\n');
    return;
  } else if (commands[s].completed === true) {
    addToOutput('u already did'+'\n');
    return;
  } else if (commands[pc()].op1 === s) {
    addToOutput(commands[pc()].out1);
    commands[pc()].completed = true;
    if (commands[pc()].after === 'none') {
      return;
    } else {
      addToOutput('now you can complete: '+commands[pc()].after)
      commands[commands[pc()].after].require = 'met';
    }
    return;
  } else if (commands[pc()].op2 === s) {
    addToOutput(commands[pc()].out2+'\n');
    return;
  } else if (commands[commands[s].require].completed === false) {
    addToOutput('you need to complete ' + commands[s].require+'\n');
    return;
  } else {
    addToOutput('error');
  }
}
