function genMaze () {
  console.log('生成中')
  var map = []
  var width = 5
  var height = 5
  var x = width/2|0
  var y = height/2|0
  var seed = Math.random()*100000|0

  var randomGen = function(seed){
    if(seed===undefined) seed=performance.now()
    return function(){
      seed = (seed * 9301 + 49297) % 233280
      return seed/233280
    }
  }

  var random = randomGen(seed)
  for(var i=0;i<height*2;i++){
    map[i] = []
    for(var j=0;j<width*2;j++){
      map[i][j] = false
    }
  }
  map[y*2][x*2] = true
  var route = [[x,y]]


  var loop = function(){
    x = route[route.length-1][0]|0
    y = route[route.length-1][1]|0

    var directions = [[1,0],[-1,0],[0,1],[0,-1]],
      alternatives = []

    for(var i=0;i<directions.length;i++){
      if(map[(directions[i][1]+y)*2]!=undefined&&
        map[(directions[i][1]+y)*2][(directions[i][0]+x)*2]===false){
        alternatives.push(directions[i])
      }
    }

    if(alternatives.length===0){
      route.pop()
      if(route.length>0){
        loop()
      } else {
        console.log('完成')
        console.log(map)
      }
      return;
    }
    var direction = alternatives[random()*alternatives.length|0]
    route.push([direction[0]+x,direction[1]+y])
    map[(direction[1]+y)*2][(direction[0]+x)*2] = true
    map[direction[1]+y*2][direction[0]+x*2] = true
    loop()
  }
  loop()
}