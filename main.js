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
      Math.round(Math.random()) === 0 ?
        div.style.borderLeft = 'dashed' : div.style.borderTop = 'dashed';
      break;
    case div.hasAttribute('top-right-corner') :
      Math.round(Math.random()) === 0 ?
        div.style.borderRight = 'dashed' : div.style.borderTop = 'dashed';
      break;
    case div.hasAttribute('bottom-right-corner') :
      Math.round(Math.random()) === 0 ?
        div.style.borderRight = 'dashed' : div.style.borderBottom = 'dashed';
      break;
    case div.hasAttribute('bottom-left-corner') :
      Math.round(Math.random()) === 0 ?
        div.style.borderLeft = 'dashed' : div.style.borderBottom = 'dashed';
      break;
    case div.hasAttribute('top') :
      div.style.borderTop = 'dashed';
      break;
    case div.hasAttribute('bottom') :
      div.style.borderBottom = 'dashed';
      break;
    case div.hasAttribute('left') :
      div.style.borderLeft = 'dashed';
      break;
    case div.hasAttribute('right') :
      div.style.borderRight = 'dashed';
      break;
  }
}
settingInOut(inlet);
settingInOut(outlet);


//check attribute, if corner, then set out of 2 set one randomly as the inlet/outlet
//if not corner ie top bottom right left, then set inlet/outlet as top/bottom/right/left...





// swap('1-1','3-3','foo','bar');
