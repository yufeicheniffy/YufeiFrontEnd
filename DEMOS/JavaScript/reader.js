var fs = require('fs');
data="hello world"
var printtofile=function(filename,data){
    fs.appendFile(filename, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
var startDate
filename="log1.txt"
for(var i=1;i<10;i++){
    printtofile(filename,data+i+'\n'+"data:")
}
