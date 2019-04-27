
//global variable


process.on('message', (infoArray) => {




if(infoArray[0]=="analyseThis"){


//var workerCommand = infoArray[1];


var filepath = infoArray[1]

process.env.NODE_ENV = "production";

  
if(process.platform=='win32'){

var stringProcessingSlash ="\\";
        }

        if(process.platform == 'linux' || process.platform == 'darwin'){
            var stringProcessingSlash ="/";
        }

  var ffprobe = require('ffprobe'),
  ffprobeStatic = require('ffprobe-static');
  var path = require("path");


  var ffprobeStaticPath = ''

  if(process.env.NODE_ENV == 'production'){
  
  ffprobeStaticPath = require('ffprobe-static').path.replace('app.asar', 'app.asar.unpacked')
  
  }else{
  ffprobeStaticPath = require('ffprobe-static').path
  }

    var thisval
 
ffprobe(filepath, { path: ffprobeStaticPath }, function (err, info) {
  //if (err) return done(err);

  if (err){
    var message = [
        "fileInfo",
        info,
        ];
    process.send(message);
    
    process.exit()

    
  }


  //console.log(info);

  console.log(info);

thisval = info;

console.log(thisval.streams[0]["codec_name"]);

var message = [
    "fileInfo",
    info,
    ];
process.send(message);

process.exit()

});


//

}



});