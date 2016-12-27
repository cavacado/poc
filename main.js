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

// function applyListeners
document.getElementById('1-1').addEventListener('click', function(){
  swapNext = swapFunc(document.getElementById('1-1').id, document.getElementById('1-1').classList[0]);
  divChilds.map(function(value,index){
    if (index!==0){
      value.addEventListener('click', function(){
        swapNext(value.id, value.classList[0]);
      })
    }
  })
})

divChilds.map(function(value,index){
    value.classList.add('bar');
  })

document.getElementById('1-1').classList.remove('bar');
document.getElementById('1-1').classList.add('foo');

// swap('1-1','3-3','foo','bar');
