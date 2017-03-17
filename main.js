init();

$('#commandLine').keyup(function(event) {
  if (event.key === 'Enter') {
    lastCommand.recent = getCleanInput();
    clearInput();
    for (var i = 0; i < lastCommand.recent.length; i++) {
      if (lastCommand.recent[i]) {
        addToOutput(lastCommand.recent[i]);
        addToCommandList(lastCommand.recent[i]);
        commandContr(lastCommand.recent[i]);
      } else {
        addToOutput(messages.general.invalidCommand);
        return;
      }
    }
  }
});

function commandContr(ic) {
  if (pc() && checkType(ic) && !(player.health[0] === 0)) {
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
        addToOutput('main 35');
    }
  } else if (player.health[0] === 0) {
    addToOutput(messages.general.dead);
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
    addToOutput('main 53');
  }
}

function responseContr(ic) {
  if (commands['adv'].active === true) {
    movePlayer(ic,player.speed);
  } else {
    if (commands[pc()].require === 'met') {
      switch (ic) {
        case commands[pc()].op1:
          op1Contr(pc());
          break;
        case commands[pc()].op2:
          op2Contr(pc());
          break;
        default:
        addToOutput('main 66');
      }
    } else {
      addToOutput(messages.general.cantDo);
    }
  }
}

function genContr(ic) {
  switch (ic) {
    case 'entertown':
      entertown();
      break;
    case 'fight':
      fight();
      break;
    case 'speedup':
      addToOutput(speed(1));
      break;
    case 'slowdown':
      addToOutput(speed(-1));
      break;
    case 'heal':
      heal();
      break;
    case 'help':
      help();
      break;
    case 'distance':
      adventureDistance();
      break;
    default:
      addToOutput('main 78');
  }
}

function op1Contr(ic) {
  switch (ic) {
    case 'adv':
      advop1();
    break;
    case 'lookingfor':
      lookingforop1();
    break;
    default:
    addToOutput('main 94');
  }
}

function op2Contr(ic) {
  switch (ic) {
    case 'adv':
      advop2();
    break;
    case 'lookingfor':
      lookingforop2();
    break;
    default:
    addToOutput('main 111');
  }
}
