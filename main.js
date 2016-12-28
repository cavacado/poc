console.log(document.getElementById('gameWrap').offsetHeight);
console.log(document.getElementById('gameWrap').offsetWidth);
//all my divs in an array
var divChilds = Array.prototype.slice.call(document.getElementById('gameWrap').children,0);
//added complexity
// var classArrWO4 = ['left-down', 'right-down', 'up-down', 'right-left', 'left-up', 'right-up', 'up-right-down-left'];
var classArr = ['left-down', 'right-down', 'up-down', 'right-left', 'left-up', 'right-up'];

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
function swapFunc(id1,class1){
  return function (id2,class2){
    console.log(class1,class2);
    if (class1 !== class2){
      document.getElementById(id1).classList.add(class2);
      document.getElementById(id1).classList.remove(class1);
      document.getElementById(id2).classList.add(class1);
      document.getElementById(id2).classList.remove(class2);
      console.log('operation success');
    } else {
      console.log('clicked on a div with the exact same class, no change occured');
    }
  }
}

var swapNext;
//probably have to rewrite this code to be more dynamic; ie not to hardocode the zeroth element
divChilds.map(function(value,index){
  value.addEventListener('click',function(){
    if (swapNext){
      switch(true){
        case value.classList.contains('left-down') :
          swapNext(value.id,'left-down');
          break;
        case value.classList.contains('right-down') :
          swapNext(value.id,'right-down');
          break;
        case value.classList.contains('up-down') :
          swapNext(value.id,'up-down');
          break;
        case value.classList.contains('right-left') :
          swapNext(value.id,'right-left');
          break;
        case value.classList.contains('left-up') :
          swapNext(value.id,'left-up');
          break;
        case value.classList.contains('right-up') :
          swapNext(value.id,'right-up');
          break;
        case value.classList.contains('up-right-down-left') :
          swapNext(value.id,'up-right-down-left');
          break;
      }
      // swapNext(value.id,value.classList[0]);
      console.log('swapNext fired');
      swapNext = 0;
    } else {
      switch(true){
        case value.classList.contains('left-down') :
          swapNext = swapFunc(value.id,'left-down');
          break;
        case value.classList.contains('right-down') :
          swapNext = swapFunc(value.id,'right-down');
          break;
        case value.classList.contains('up-down') :
          swapNext = swapFunc(value.id,'up-down');
          break;
        case value.classList.contains('right-left') :
          swapNext = swapFunc(value.id,'right-left');
          break;
        case value.classList.contains('left-up') :
          swapNext = swapFunc(value.id,'left-up');
          break;
        case value.classList.contains('right-up') :
          swapNext = swapFunc(value.id,'right-up');
          break;
        case value.classList.contains('up-right-down-left') :
          swapNext = swapFunc(value.id,'up-right-down-left');
          break;
      }
      // swapNext = swapFunc(value.id, value.classList[0]);
      console.log('clicked on a div; waiting on another click....');
    }
  })
})

//might not need to put an attribute; can use class instead
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
var outerDivs = divChilds.filter(function(value){
  if (Array.prototype.slice.call((value.attributes),0).length === 3){
    return true;
  } else {
    return false
  }
})

var divInOut = shuffle(outerDivs).slice(0,2);
var inlet = divInOut[0];
var outlet = divInOut[1];
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

function flowUpRightFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowUpToRight linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowLeftDownFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowLeftToDown linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowDownLeftFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowDownToLeft linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowLeftUpFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowLeftToUp linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowRightDownFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowRightToDown linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowUpLeftFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowUpToLeft linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowDownRightFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowDownToRight linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}
function flowRightUpFunc(id){
  var div = document.getElementById(id);
  div.firstElementChild.style.animation = 'flowRightToUp linear 6s';
  div.addEventListener('animationstart', function(){console.log('animation started...');});
  div.addEventListener('animationend', function(){console.log('animation end..');})
}

// All flows work well; nice!!!
// flowUpRightFunc('rand');
// flowLeftDownFunc('rand');
// flowDownLeftFunc('rand');
// flowLeftUpFunc('rand');
// flowRightDownFunc('rand');
// flowUpLeftFunc('rand');
// flowDownRightFunc('rand');
// flowRightUpFunc('rand');

setTimeout(function(){
  console.log('game started!');
  switch(true){
    case (initInFlow === 'top'):
      //if div has class up-down, trigger flow down function;
      //else if div has class right-up, trigger flow down-right function;
      //else if div has class left-up, trigger flow down-left function;
      //else trigger game over!;
      break;
    case (initInFlow === 'bottom'):
      //if div has class up-down, trigger flow up function;
      //else if div has class right-down, trigger flow up-right function;
      //else if div has class left-down, trigger flow up-left function;
      //else trigger game over!;
      break;
    case (initInFlow === 'left'):
      //if div has class right-left, trigger flow right function;
      //else if div has class left-down, trigger flow left-down function;
      //else if div has class left-up, trigger flow left-up function;
      //else trigger game over!;
      break;
    case (initInFlow === 'right'):
      //if div has class right-left, trigger flow left function;
      //else if div has class right-down, trigger flow right-down function;
      //else if div has class right-up, trigger flow right-up function;
      //else trigger game over!;
      break;
  }
} , 5000);

// function divChecker(div){
//   switch(true){
//     case (initInFlow === 'top'):
//       //if div has class up-down, trigger flow down function;
//       //else if div has class right-up, trigger flow down-right function;
//       //else if div has class left-up, trigger flow down-left function;
//       //else trigger game over!;
//       break;
//     case (initInFlow === 'bottom'):
//       //if div has class up-down, trigger flow up function;
//       //else if div has class right-down, trigger flow up-right function;
//       //else if div has class left-down, trigger flow up-left function;
//       //else trigger game over!;
//       break;
//     case (initInFlow === 'left'):
//       //if div has class right-left, trigger flow right function;
//       //else if div has class left-down, trigger flow left-down function;
//       //else if div has class left-up, trigger flow left-up function;
//       //else trigger game over!;
//       break;
//     case (initInFlow === 'right'):
//       //if div has class right-left, trigger flow left function;
//       //else if div has class right-down, trigger flow right-down function;
//       //else if div has class right-up, trigger flow right-up function;
//       //else trigger game over!;
//       break;
//   }
// }
