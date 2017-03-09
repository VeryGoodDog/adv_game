function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debug() {
  console.log('------');
  console.log(lastCommand);
  console.log('------');
  console.log(commands);
  console.log('------');
  console.log(pc());

}

function distance(x1,x2,y1,y2) {
  return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
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

function addToOutput(input) {
  $('#output').prepend('\n'+input + '\n');
  return;
}

function pc() {
  if (lastCommand.list[lastCommand.count-1]) {
    return lastCommand.list[lastCommand.count-1];
  } else {
    return lastCommand.recent;
  }

}

function clearOutput() {
  $('#output').val('');
}

function clearInput() {
  $('#commandLine').val('');
}

function checkType(ic) {
  return (commands[ic].type === 'quest' || commands[ic].type === 'response' || commands[ic].type === 'gen');
}

function setAfter(ic) {
  if (commands[ic].after != 'none') {
    for (var i = 0; i < commands[ic].after.length; i++) {
      commands[commands[ic].after[i]].require = 'met';
    }
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

function generateFinish(x1,y1,x2,y2) {
  createFinish(randomNumber(x1,x2),randomNumber(y1,y2));
}

function createFinish(x,y) {
  advMap.map.finish = [x,y];
  return;
}

function checkLocation(loc) {
  if (advMap.map[loc] === player.coords) {
    return true;
  } else {
    return false;
  }
}
