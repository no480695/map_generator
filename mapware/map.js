var
map       = module.exports = {},
_         = require('underscore'),
moment    = require('moment'),
async     = require('async'),
ndarray   = require('ndarray'),
hash      = require('node_hash');

map.generateMap = function ( req, res, next ){

  var
  width   = 20,
  height  = 10;

  //var map = ndarray( new Float64Array(width*height),[width,height]);

  var emptyMap = buildMatrix( width, height );

  console.log(emptyMap);

  emptyMap = addWhiteNoise( emptyMap );

  console.log(emptyMap);

  res.locals.title = "Nathan";
  next();
  return;

}

function buildMatrix( width, height ){

  var map = {};
  map.width = width;
  map.height = height;
  map.size = width*height;

  for ( var x = 0; x < width; x++ ){
    for ( var y = 0; y < height; y++ ){
      map[x+'_'+y] = { x:x,y:y,altitude:1 }
    }
  }

  return map;

}
function addWhiteNoise( map ){

  var r = Math.floor(Math.random()*2)

  for ( var x = 0; x < map.width; x++ ){
    for ( var y = 0; y < map.height; y++ ){

      map[x+'_'+y].altitude = r;
      r=Math.floor(Math.random()*2);

    }
  }
  return map;

}

