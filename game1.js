addToOutput(messages.general.starter);

$('#commandLine').keyup(function(event) {
  if (event.key === 'Enter' && lastCommand.recent !== '') {
    lastCommand.recent = getCleanInput();
    console.log(lastCommand.recent);
    clearInput();
    if (lastCommand.recent != messages.general.invalidCommand) {
      addToOutput(lastCommand.recent);
      addToCommandList(lastCommand.recent);
      commandContr(lastCommand.recent);
    } else {
      addToOutput(messages.general.invalidCommand);
      return;
    }
  }
});

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxI(string) {
  return [string].length - 2;
}

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
  return messages.general.invalidCommand;
}

function checkType(ic) {
  return (commands[ic].type === 'quest' || commands[ic].type === 'response' || commands[ic].type === 'gen');
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

function setAfter(ic) {
  if (commands[ic].after != 'none') {
    for (var i = 0; i < commands[ic].after.maxI - 2; i++) {
      commands[commands[ic].after].require = 'met';
    }
    return;
  }
}

function setStatus(d) {
  if (player.health[0]+d >= player.health[1]) {
    player.health[0] = player.health[1];
    return player.health[0];
  } else if (player.health[0]+d <= 0){
    player.health[0] = 0;
    addToOutput(messages.general.death)
    return player.health[0];
  } else if (player.health[0]+d < player.health[1] && player.health[0]+d > 0) {
    player.health[0] += d;
    return player.health[0];
  }
}

function setPlayerCoord(x,y) {
  advMap[player.coord[0]][player.coord[1]] = 0;
  advMap[player.coord[y]][player.coord[x]] = 1;
  player.coord = [y,x];
  return player.coord;
}

function movePlayer(dir) {
  switch (dir) {
    case 'up':

      break;
    case 'right':

      break;
    case 'down':

      break;
    case 'left':

      break;
    default:

  }
}

function commandContr(ic) {
  if (commands['help'].active === true) {
    addToOutput(commands[ic].description)
  } else if (pc() && checkType(ic) && !(player.health[0] === 0)) {
    switch (commands[ic].type) {
      case 'response':
        responseContr(ic);
        break;
      case 'quest':
        questContr(ic);
        break;
      case 'gen':
        genContr(ic);
        break;
      default:
        addToOutput(messages.general.error);
    }
  } else if (player.health[0] === 0) {
    addToOutput(messages.general.dead)
  }
}

function questContr(ic) {
  if (commands[ic].completed === true) {
    addToOutput(messages.general.questAlreadyCompleted + ic)
    return;
  } else if (commands[ic].require === 'met') {
    addToOutput(messages[ic].text+'\n'+commands[ic].op1+' '+commands[ic].op2);
    return;
  } else if (commands[commands[ic].require].completed === false) {
    addToOutput(messages.general.questIncomplete + commands[ic].require);
    return;
  } else {
    addToOutput(messages.general.error);
  }
}

function responseContr(ic) {
  if (commands[pc()].op1 === ic) {
    op1Contr(pc());
  } else if (commands[pc()].op2 === ic) {
    op2Contr(pc());
  }
}

function genContr(ic) {
  switch (ic) {
    case 'heal':
      heal();
      break;
    case 'help':
      help();
      break;
    default:
      addToOutput(messages.general.error);
  }
}

function op1Contr(ic) {
  switch (ic) {
    case 'start':
      startop1(ic);
    break;
    case 'fight':
      fightop1();
    break;
    case 'adv':
      advop1();
    break;
    default:
    addToOutput(messages.general.error);

  }
}

function op2Contr(ic) {
  switch (ic) {
    case 'start':
      startop2(ic);
    break;
    case 'fight':
      fightop2();
    break;
    case 'adv':
      advop2();
    break;
    default:
    addToOutput(messages.general.error);
  }
}

function genop1(ic) {
  addToOutput(commands[ic].out1);
  commands[ic].completed = true;
  addToOutput(messages.general.questCompleted+ commands[ic].after)
  setAfter(ic);
  setStatus(0);
  return;
}

function genop2(ic) {
  addToOutput(commands[ic].out2);
  setStatus(0);
  return;
}

function startop1() {
  addToOutput(messages['start'].out1);
  commands['start'].completed = true;
  addToOutput(messages.general.questCompleted+ commands['start'].after)
  setAfter('start');
  setStatus(0);
  return;
}

function startop2() {
  addToOutput(messages['start'].out2);
  setStatus(0);
  return;
}

function fightop1() {
  if (randomNumber(0,10) >= 2) {
    addToOutput(messages['fight'].out1);
    commands['fight'].fightCount++;
    if (commands['fight'].fightCount >= 5) {
      addToOutput(messages.fight.fightEnd);
      addToOutput(messages.general.questCompleted + commands['fight'].after);
      setAfter('fight');
      addToOutput(messages.general.health+setStatus(40));
      return;
    } else {
      addToOutput(messages.fight.fightCount+commands['fight'].fightCount);
      addToOutput(messages.general.health+setStatus(-1));
      return;
    }
  } else {
    addToOutput(messages['fight'].out2);
    addToOutput(messages.general.health+setStatus(-2));
    return;
  }
}

function fightop2() {
  addToOutput(messages['fight'].out2);
  return;
}

function advop1() {
  addToOutput(messages['adv'].out1);
  addToOutput(messages.general.questCompleted+commands['adv'].after);
  setAfter('adv');
  return;
}

function advop2() {
  addToOutput(messages['adv'].out2);
  setStatus(-20);
  return;
}

function help() {
  for (var i = 0; i < commands.vldCmds.length; i++) {
    addToOutput(commands.vldCmds[i]);
  }
  commands['help'].active = true
}

function heal() {
  addToOutput(messages.general.health+setStatus(2));
}
