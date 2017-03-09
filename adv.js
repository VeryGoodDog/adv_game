function getPlayerCoords() {
  return player.coords;
}

function setPlayerCoords(x,y) {
  player.coords = [x,y];
  return player.coords;
}

function movePlayerUp(d) {
  return setPlayerCoords(player.coords[0]+d,player.coords[1]+0);
}

function movePlayerRight(d) {
  return setPlayerCoords(player.coords[0]+0,player.coords[1]+d);
}

function movePlayerDown(d) {
  return setPlayerCoords(player.coords[0]-d,player.coords[1]+0);
}

function movePlayerLeft(d) {
  return setPlayerCoords(player.coords[0]+0,player.coords[1]-d);
}

function movePlayer(dir,a) {
  switch (dir) {
    case 'up':
      movePlayerUp(a);
      addToOutput(getPlayerCoords());
      addToOutput(checkLocation(player.destination, messages.general.reachFinish));
      break;
    case 'right':
      movePlayerRight(a);
      addToOutput(getPlayerCoords());
      addToOutput(checkLocation(player.destination, messages.general.reachFinish));
      break;
    case 'down':
      movePlayerDown(a);
      addToOutput(getPlayerCoords());
      addToOutput(checkLocation(player.destination, messages.general.reachFinish));
      break;
    case 'left':
      movePlayerLeft(a);
      addToOutput(getPlayerCoords());
      addToOutput(checkLocation(player.destination, messages.general.reachFinish));
      break;
    default:
      addToOutput(messages.adv.advActive);
  }
}

function setDistance() {
  advMap.dist = distance(advMap.map.finish[0],player.coords[0],advMap.map.finish[1],player.coords[1])
}

function adventureDistance() {
  setDistance();
  addToOutput(messages.adv.advGoalDistance+Math.round(advMap.dist));
}

function speed(d) {
  player.speed += d;
  return player.speed;
}
