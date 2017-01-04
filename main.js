//controlling sound elements;
document.getElementById('clickSound').volume = 0.6;
document.getElementById('beepSound').volume = 0.1;
document.getElementById('radarSound').volume = 0.1;
document.getElementById('yaySound').volume = 0.5;
console.log(document.getElementById('gameWrap').offsetHeight);
console.log(document.getElementById('gameWrap').offsetWidth);
//all my divs in an array
var divChilds = Array.prototype.slice.call(document.getElementById('gameWrap').children,0);
//added complexity
// var classArrWO4 = ['left-down', 'right-down', 'up-down', 'right-left', 'left-up', 'right-up', 'up-right-down-left'];
var classArr = ['left-down', 'right-down', 'up-down', 'right-left', 'left-up', 'right-up'];
//grabbing playerScore from localStorage
var playerScore;
playerScore = Number(localStorage.playerScore) || 0;
console.log(playerScore);
document.getElementById('score').innerText = playerScore;

//shuffle utility function
function shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
    return arr;
}

//swapFunc is curried
//returns a function that expects the second div;
//if function is complete; execute!
//else it knows that its the first function executing..
function swapFunc(id1,class1){
  //adding animations using animations.css
  document.getElementById('clickSound').play();
  document.getElementById(id1).classList.add('animated');
  document.getElementById(id1).classList.add('pulse');
  setTimeout( function(){
    document.getElementById(id1).classList.remove('pulse');
  }, 700);
  return function (id2,class2){
    console.log(class1,class2);
    if (class1 !== class2){
      //adding animations using animations.css
      document.getElementById('clickSound').play();
      document.getElementById(id2).classList.add('animated');
      document.getElementById(id2).classList.add('pulse');
      //these set timeout statements are to remove the animation class after they've been clicked
      //this is so that the animation class can be reapplied when clicked again later
      setTimeout( function(){
        document.getElementById(id2).classList.remove('pulse');
      }, 700);
      document.getElementById(id1).classList.add(class2);
      document.getElementById(id1).classList.remove(class1);
      document.getElementById(id2).classList.add(class1);
      document.getElementById(id2).classList.remove(class2);
      console.log('operation success');
    } else {
      document.getElementById('beepSound').play();
      document.getElementById(id1).classList.toggle('shake');
      setTimeout( function(){
        document.getElementById(id1).classList.remove('shake');
      }, 700);
      document.getElementById(id2).classList.add('animated');
      document.getElementById(id2).classList.toggle('shake');
      setTimeout( function(){
        document.getElementById(id2).classList.remove('shake');
      }, 700);
      console.log('clicked on a div with the exact same class, no change occured');
    }
  }
}

var swapNext;
var handler = function(){
  if (swapNext){
    switch(true){
      case this.classList.contains('left-down') :
        swapNext(this.id,'left-down');
        break;
      case this.classList.contains('right-down') :
        swapNext(this.id,'right-down');
        break;
      case this.classList.contains('up-down') :
        swapNext(this.id,'up-down');
        break;
      case this.classList.contains('right-left') :
        swapNext(this.id,'right-left');
        break;
      case this.classList.contains('left-up') :
        swapNext(this.id,'left-up');
        break;
      case this.classList.contains('right-up') :
        swapNext(this.id,'right-up');
        break;
      case this.classList.contains('up-right-down-left') :
        swapNext(this.id,'up-right-down-left');
        break;
    }
    // swapNext(this.id,this.classList[0]);
    console.log('swapNext fired');
    swapNext = 0;
  } else {
    switch(true){
      case this.classList.contains('left-down') :
        swapNext = swapFunc(this.id,'left-down');
        break;
      case this.classList.contains('right-down') :
        swapNext = swapFunc(this.id,'right-down');
        break;
      case this.classList.contains('up-down') :
        swapNext = swapFunc(this.id,'up-down');
        break;
      case this.classList.contains('right-left') :
        swapNext = swapFunc(this.id,'right-left');
        break;
      case this.classList.contains('left-up') :
        swapNext = swapFunc(this.id,'left-up');
        break;
      case this.classList.contains('right-up') :
        swapNext = swapFunc(this.id,'right-up');
        break;
      case this.classList.contains('up-right-down-left') :
        swapNext = swapFunc(this.id,'up-right-down-left');
        break;
    }
    // swapNext = swapFunc(value.id, value.classList[0]);
    console.log('clicked on a div; waiting on another click....');
  }
}

//probably have to rewrite this code to be more dynamic; ie not to hardocode the zeroth element
//re written to be more dynamic already!
//randomColor is taken from randomColor.js not my js!
divChilds.map(function(value,index){
  value.classList.add('fade');
  value.style.backgroundColor = randomColor({luminosity: 'light',count: 25})[index];
  value.addEventListener('click',handler)
})

// might not need to put an attribute; can use class instead
// adding attributes surprisingly worked really well; does not pollute the class space.
divChilds.map(function(value,index){
    value.classList.add(classArr[Math.floor(Math.random()*classArr.length)])
    if (value.id ==='1-1'){
      value.setAttribute('top-left-corner',true)
    };
    if (value.id ==='1-5'){
      value.setAttribute('top-right-corner',true)
    };
    if (value.id ==='5-1'){
      value.setAttribute('bottom-left-corner',true)
    };
    if (value.id ==='5-5'){
      value.setAttribute('bottom-right-corner',true)
    };
    if (value.id ==='1-2' || value.id ==='1-3' || value.id==='1-4'){
      value.setAttribute('top',true);
    }
    if (value.id ==='2-1' || value.id ==='3-1' || value.id==='4-1'){
      value.setAttribute('left',true);
    }
    if (value.id ==='2-5' || value.id ==='3-5' || value.id==='4-5'){
      value.setAttribute('right',true);
    }
    if (value.id ==='5-2' || value.id ==='5-3' || value.id==='5-4'){
      value.setAttribute('bottom',true);
    }
  })

//might need to tailor this.. not hardcode it to 3 element length
//yes this is the most dangerous part of my code
// WATCH OUT HERE!!!!!!
//MOST DANGEROUS OF ALL!!!
var outerDivs = divChilds.filter(function(value){
  if (Array.prototype.slice.call((value.attributes),0).length === 4){
    return true;
  } else {
    return false
  }
})
//MOST DANGEROUS OF ALL!!!
// console.log(outerDivs);

//defining inlet/outlet (noticed it is dependent on the previous section of code?)
//setting all properties of inlet/outlet ie background color remove fade class
var divInOut = shuffle(outerDivs).slice(0,2);
var inlet = divInOut[0];
var outlet = divInOut[1];
inlet.classList.remove('fade');
outlet.classList.remove('fade');
inlet.style.backgroundColor = 'default';
outlet.style.backgroundColor = 'default';
inlet.style.backgroundColor = 'rgb(214,0,255)';
outlet.style.backgroundColor = 'rgb(0,255,159)';
function settingInOut(div){
  switch(true){
    case div.hasAttribute('top-left-corner') :
      return Math.round(Math.random()) === 0 ?
        div.style.borderLeft = 'dashed' : div.style.borderTop = 'dashed';
    case div.hasAttribute('top-right-corner') :
      return Math.round(Math.random()) === 0 ?
        div.style.borderRight = 'dashed' : div.style.borderTop = 'dashed';
    case div.hasAttribute('bottom-right-corner') :
      return Math.round(Math.random()) === 0 ?
        div.style.borderRight = 'dashed' : div.style.borderBottom = 'dashed';
    case div.hasAttribute('bottom-left-corner') :
      return Math.round(Math.random()) === 0 ?
        div.style.borderLeft = 'dashed' : div.style.borderBottom = 'dashed';
    case div.hasAttribute('top') :
      return div.style.borderTop = 'dashed';
    case div.hasAttribute('bottom') :
      return div.style.borderBottom = 'dashed';
    case div.hasAttribute('left') :
      return div.style.borderLeft = 'dashed';
    case div.hasAttribute('right') :
      return div.style.borderRight = 'dashed';
  }
}
settingInOut(inlet);
settingInOut(outlet);

var initInFlow, initOutFlow;
//setting the inlet and outlet dashed lines..
var borderStyles = ['border-top-style','border-bottom-style','border-right-style','border-left-style'];
borderStyles.map(function(value){
    if (getComputedStyle(inlet).getPropertyValue(value) === 'dashed'){
      initInFlow = value.split('-')[1];
    }
    })
borderStyles.map(function(value){
    if (getComputedStyle(outlet).getPropertyValue(value) === 'dashed'){
      initOutFlow = value.split('-')[1];
    }
    })

console.log(`inlet starts flowing from ${initInFlow} direction`);
console.log(`outlet starts flowing out from ${initOutFlow} direction`);
//need to find a way to animate water flow...
//plus checking method for game over or whether pipe should flow
//....

var prevSpeed;
var speed = 3;
// 4 straight flows...
function flowDownFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-down-fill.svg')`;
  div.firstElementChild.style.animation = `flowUpToDown linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowUpFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-down-fill.svg')`;
  div.firstElementChild.style.animation = `flowDownToUp linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowRightFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/right-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowLeftToRight linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowLeftFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/right-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowRightToLeft linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}

// 8 curved flows...
function flowUpRightFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/right-down-fill.svg')`;
  div.firstElementChild.style.animation = `flowUpToRight linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowLeftDownFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/right-down-fill.svg')`;
  div.firstElementChild.style.animation = `flowLeftToDown linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowDownLeftFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowDownToLeft linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowRightUpFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowLeftToUp linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowRightDownFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/down-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowRightToDown linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowUpLeftFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/down-left-fill.svg')`;
  div.firstElementChild.style.animation = `flowUpToLeft linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowDownRightFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-right-fill.svg')`;
  div.firstElementChild.style.animation = `flowDownToRight linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowLeftUpFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.backgroundImage = `url('public/images/up-right-fill.svg')`;
  div.firstElementChild.style.animation = `flowRightToUp linear ${speed}s`;
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}

// All flows work well; nice!!!
// flowUpRightFunc('rand');
// flowLeftDownFunc('rand');
// flowDownLeftFunc('rand');
// flowRightUpFunc('rand');
// flowRightDownFunc('rand');
// flowUpLeftFunc('rand');
// flowDownRightFunc('rand');
// flowLeftUpFunc('rand');
// flowDownFunc('rand');
// flowUpFunc('rand');
// flowRightFunc('rand');
// flowLeftFunc('rand');



function startGame(){
  //setting time and speed settings
  document.getElementById('speed').innerText = speed;
  var time = 5;
  var intervalHandle = setInterval(function(){
    document.getElementById('time').innerText = time;
    time--;
    if (time < 0) {
      clearInterval(intervalHandle);
    }
  },1000);

  setTimeout(function(){
    console.log('game started!');
    document.getElementById('radarSound').loop = true;
    document.getElementById('radarSound').play()
    var prevDivId = inlet.id;
    //this swtich chunk can be refactored down into nice concise code but meh...(too lazy to do so)
    switch(true){
      case (initInFlow === 'top'):
        //if div has class up-down, trigger flow down function;
        //else if div has class right-up, trigger flow down-right function;
        //else if div has class left-up, trigger flow down-left function;
        //else trigger game over!;
        if (inlet.classList.contains('up-down')){
          flowDownFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) + 1) + '-' + inlet.id.split('')[2];
        } else if (inlet.classList.contains('right-up')){
          flowDownRightFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) + 1);
        } else if (inlet.classList.contains('left-up')){
          flowDownLeftFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) - 1);
        } else {
          console.log(`init stage: game over due to mismatched tiles`);
          displayCondition('lose');
        }
        break;
      case (initInFlow === 'bottom'):
        //if div has class up-down, trigger flow up function;
        //else if div has class right-down, trigger flow up-right function;
        //else if div has class left-down, trigger flow up-left function;
        //else trigger game over!;
        if (inlet.classList.contains('up-down')){
          flowUpFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) - 1) + '-' + inlet.id.split('')[2];
        } else if (inlet.classList.contains('right-down')){
          flowUpRightFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) + 1);
        } else if (inlet.classList.contains('left-down')){
          flowUpLeftFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) - 1);
        } else {
          console.log(`init stage: game over due to mismatched tiles`);
          displayCondition('lose');
        }
        break;
      case (initInFlow === 'left'):
        //if div has class right-left, trigger flow right function;
        //else if div has class left-down, trigger flow right-down function;
        //else if div has class left-up, trigger flow right-up function;
        //else trigger game over!;
        if (inlet.classList.contains('right-left')){
          flowRightFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) + 1);
        } else if (inlet.classList.contains('left-down')){
          flowRightDownFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) + 1) + '-' + inlet.id.split('')[2];
          console.log(nextDivId);
        } else if (inlet.classList.contains('left-up')){
          flowRightUpFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) - 1) + '-' + inlet.id.split('')[2];
        } else {
          console.log(`init stage: game over due to mismatched tiles`);
          displayCondition('lose');
        }
        break;
      case (initInFlow === 'right'):
        //if div has class right-left, trigger flow left function;
        //else if div has class right-down, trigger flow left-down function;
        //else if div has class right-up, trigger flow left-up function;
        //else trigger game over!;
        if (inlet.classList.contains('right-left')){
          flowLeftFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = inlet.id.split('')[0] + '-' + (Number(inlet.id.split('')[2]) - 1);
        } else if (inlet.classList.contains('right-down')){
          flowLeftDownFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) + 1) + '-' + inlet.id.split('')[2];
        } else if (inlet.classList.contains('right-up')){
          flowLeftUpFunc(inlet.id);
          console.log(inlet.id);
          var nextDivId = (Number(inlet.id.split('')[0]) - 1) + '-' + inlet.id.split('')[2];
        } else {
          console.log(`init stage: game over due to mismatched tiles`);
          displayCondition('lose');
        }
        break;
    }
    inlet.removeEventListener('click', handler);
    inlet.classList.remove('fade');
    divChecker(nextDivId, prevDivId);
  } , 6000);
}

if (!playerScore) {
  document.getElementById('instructionsBox').style.display = "block";
  //call start game function only after clicking start game button;
} else {
  startGame();
  document.getElementById('startGame').disabled = true;
}

//actualy don't really know why this function really is needed lol; when I was coding it I wasn't too sure about it at all but it works so yay! (might be bloat might need to remove next time..)
function checkValidMove(prevDiv,curDiv){
  if (prevDiv.classList.contains('up-down') && !curDiv.classList.contains('right-left')) {
    return true;
  } else if (prevDiv.classList.contains('right-left') && !curDiv.classList.contains('up-down')) {
    return true;
  } else {
    return true;
  }
}

function checkOutFlow(div){
  switch(initOutFlow){
    case 'top':
      return (div.classList.contains('up-down') || div.classList.contains('left-up') || div.classList.contains('right-up')) ? true : false;
    case 'bottom':
      return (div.classList.contains('up-down') || div.classList.contains('left-down') || div.classList.contains('right-down')) ? true : false;
    case 'left':
      return (div.classList.contains('right-left') || div.classList.contains('left-up') || div.classList.contains('left-down')) ? true : false;
    case 'right':
      return (div.classList.contains('right-left') || div.classList.contains('right-up') || div.classList.contains('right-down')) ? true : false;
  }
}
var counter = 0;
var triggered2X = false;
var triggered4X = false;
var triggered8X = false;
function divChecker(id,prevId){
  //need to trigger a pop-up(non-intrusive) to say that the points recieved from now on will be multiplied!
  //done!!! nice!!
  counter++;
  if (counter < 10 && counter > 6 && !triggered2X){
    vNotify.info({text: '2X multiplier achieved!', title:'<(￣︶￣)> Nice!! <(￣︶￣)>'});
    triggered2X = true;
  };
  if (counter < 15 && counter > 10 && !triggered4X){
    vNotify.success({text: '4X multiplier achieved! AWESOME!', title: '\(★ω★)/ Woohoo! \(★ω★)/'});
    triggered4X = true;
  };
  if (counter > 15 && !triggered8X){
    vNotify.error({text: '8X multiplier achieved! You are GOD!', title: 'おめでとうございます!'});
    triggered8X = true;
  };
  // console.log(counter);
  var prevDiv = document.getElementById(prevId);
  prevDiv.addEventListener('animationend', function(){
    var curDiv = document.getElementById(id);
    if (curDiv === outlet){console.log('final stage before win!');}
    if (curDiv === null){
      if (prevDiv === outlet) {
        //trigger win!
        if (checkOutFlow(prevDiv)) {
          console.log(`congratulations you've won!!!!`);
          displayCondition('win');
          //minus the inlet and outlet score
          //scoring multiplier added!
          if (counter < 6){
            playerScore += (counter - 2);
            localStorage.playerScore = playerScore;
          } else if (counter < 10 && counter > 6) {
            playerScore += (counter - 2) * 2;
            localStorage.playerScore = playerScore;
          } else if (counter < 15 && counter > 10){
            playerScore += (counter - 2) * 4;
            localStorage.playerScore = playerScore;
          } else {
            playerScore += (counter - 2) * 8;
            localStorage.playerScore = playerScore;
          }
          return;
        } else {
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          return;
        }
      }
      console.log(`gameover due to out of bounds!`);
      displayCondition('lose');
      return;
    };
    if (checkValidMove(prevDiv,curDiv)){
      switch(true){
        case (curDiv.classList.contains('up-down')) :
          console.log(id);
          if (prevId[0] > id[0]) {
            flowUpFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) - 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          if (prevId[0] < id[0]) {
            flowDownFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) + 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
        case (curDiv.classList.contains('right-left')) :
          console.log(id);
          if (prevId[2] > id[2]) {
            flowLeftFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) - 1);
            break;
          };
          if (prevId[2] < id[2]) {
            flowRightFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) + 1);
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
        case (curDiv.classList.contains('left-down')) :
          console.log(id);
          if (prevId[0] === id[0] && prevId[2] < id[2]) {
            flowRightDownFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) + 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          if (prevId[0] > id[0]) {
            flowUpLeftFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) - 1);
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
        case (curDiv.classList.contains('left-up')) :
          console.log(id);
          if (prevId[0] === id[0] && prevId[2] < id[2]) {
            flowRightUpFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) - 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          if (prevId[0] < id[0]) {
            flowDownLeftFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) - 1);
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
        case (curDiv.classList.contains('right-down')) :
          console.log(id);
          if (prevId[0] === id[0] && prevId[2] > id[2]) {
            flowLeftDownFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) + 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          if (prevId[0] > id[0]) {
            flowUpRightFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) + 1);
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
        case (curDiv.classList.contains('right-up')) :
          console.log(id);
          if (prevId[0] === id[0] && prevId[2] > id[2]) {
            flowLeftUpFunc(id);
            var nextDivId = (Number(curDiv.id.split('')[0]) - 1) + '-' + curDiv.id.split('')[2];
            break;
          };
          if (prevId[0] < id[0]) {
            flowDownRightFunc(id);
            var nextDivId = curDiv.id.split('')[0] + '-' + (Number(curDiv.id.split('')[2]) + 1);
            break;
          };
          console.log(`gameover due to unmatched tiles`);
          displayCondition('lose');
          break;
      }
      curDiv.removeEventListener('click',handler);
      curDiv.classList.remove('fade');
      curDiv.style.backgroundColor = 'rgb(214,0,255)';
      divChecker(nextDivId,id);
    }
  })
}

window.addEventListener("keydown",function(e){
  //adding listeners to the spacebar and enter keys
  if (e.keyCode === 32){
    if (speed > 1){
      speed--;
      document.getElementById('speed').innerText = speed;
      }
    } else if (e.keyCode === 13){
      prevSpeed = speed;
      speed = 0;
      document.getElementById('speed').innerText = 'hyperdrive warming up....!';
      document.getElementById('hyperdriveSound').play();
      setTimeout(function(){
        document.getElementById('speed').innerText = 'hyper speed!';
        document.getElementById('backgroundChanger').style.backgroundColor = 'transparent';
        document.getElementById('backgroundChanger').style.backgroundImage = `url('public/images/lightspeed2.jpg')`;
      }, 2000)
      console.log('hyperdrive initiated');
    }
});

//DONE!!!!
//<---------------------------------------------->
//implement outlet condition...
//implement game over function...
//implement speed trigger
//implement a finish flow immmediately listener
//<---------------------------------------------->

// open the mPopup once the link is clicked
var displayCondition = function(param) {
  switch(param){
    case 'win':
      document.getElementById('yaySound').play();
      document.getElementById('headMsg').innerText = '＼(￣▽￣)／Congratulations!!!!＼(￣▽￣)／';
      document.getElementById('message').innerText = 'you are awesome! ヽ(>∀<☆)ノ keep it up!';
      document.getElementById('radarSound').muted = true;
      break;
    case 'lose':
      document.getElementById('wawawaaSound').play();
      document.getElementById('headMsg').innerText = '(╯︵╰,)Game Over...(╯︵╰,)';
      document.getElementById('message').innerText = 'please try again! ╰(*´︶`*)╯';
      document.getElementById('radarSound').muted = true;
      break;
  }
  document.getElementById('mpopupBox').style.display = "block";
}
// close the mPopup once close element is clicked
document.getElementById('endCloseButton').onclick = function() {
  document.getElementById('mpopupBox').style.display = "none";
}
document.getElementById('restart').onclick = function() {
  location.reload();
}


document.getElementById('ipopupLink').addEventListener('click',function(){
  document.getElementById('instructionsBox').style.display = "block";
})
document.getElementById('startCloseButton').onclick = function() {
  document.getElementById('instructionsBox').style.display = "none";
}
document.getElementById('startGame').addEventListener('click',function(){
  startGame();
  document.getElementById('instructionsBox').style.display = "none";
})
