console.log(document.getElementById('gameWrap').offsetHeight);
console.log(document.getElementById('gameWrap').offsetWidth);
//all my divs in an array
var divChilds = Array.prototype.slice.call(document.getElementById('gameWrap').children,0);

function swapFunc(id1,class1){
  return function (id2,class2){
    document.getElementById(id1).classList.add(class2);
    document.getElementById(id1).classList.remove(class1);
    document.getElementById(id2).classList.add(class1);
    document.getElementById(id2).classList.remove(class2);
    console.log('operation success');
  }
}

var swapNext;
divChilds.map(function(value,index){
  value.addEventListener('click',function(){
    if (swapNext){
      swapNext(value.id,value.classList[0]);
      console.log('hello');
      swapNext = 0;
    } else {
      swapNext = swapFunc(value.id, value.classList[0]);
      console.log('nice');
    }
  })
})

divChilds.map(function(value,index){
    value.classList.add('bar');
  })

document.getElementById('1-1').classList.remove('bar');
document.getElementById('1-1').classList.add('foo');

// swap('1-1','3-3','foo','bar');
