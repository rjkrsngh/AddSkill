const moment = require('moment');
const fs = require('fs');
const EventEmitter = require('events');

class EvEmitter extends EventEmitter{};
const emitter = new EvEmitter();

// argv[0] = node
// argv[1] = <filename>
// get the remaining arguments in args
var args = process.argv.slice(2);
var streamValueInd = args.indexOf('--stream') + 1;

// store the value of NODE_ENV in nodeEnvVal
var nodeEnvVal = process.env.NODE_ENV;

// configure the src and dest directory names taking NODE_ENV into account
var SRC_DIR = './' + nodeEnvVal + '/src';
var DEST_DIR = './' + nodeEnvVal + '/dest';

// This will hold the source file name.
// This same file name will be used to create destination file too.
var srcFileName = "";

// This text will be written to the files
let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel fringilla ligula. In hac habitasse platea dictumst. Aliquam erat volutpat. Sed nec diam ut dui aliquam viverra. 
			Phasellus tempor efficitur enim eget imperdiet. Nulla eget dapibus velit, at luctus odio. Mauris eu massa mauris.
			Ut nec sodales ante. Ut non odio dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
			cubilia curae; Duis consequat ligula et lectus pretium imperdiet. Aliquam vestibulum efficitur orci in vulputate. 
			Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer est urna, 
			vulputate et urna id, tincidunt mollis metus.`;

// Function to create NODE_ENV folders
const createEnvironmentFolders = ()=>{
	if(!fs.existsSync(SRC_DIR)){
		fs.mkdirSync(SRC_DIR, {recursive : true})
	}else{
		console.log(SRC_DIR + ' ALREADY EXISTS');
	}

	if(!fs.existsSync(DEST_DIR)){
		fs.mkdirSync(DEST_DIR, {recursive : true});
	}else{
		console.log(DEST_DIR + " ALREADY EXISTS");
	}
}

// Function to create and populate source files
const createAndPopulateSourceFiles = ()=>{
	srcFileName = moment().format('YYYY_MM_DD_HH_MM_SS') + ".txt";
	// let text = "some text!";

	fs.writeFileSync(SRC_DIR + '/' + srcFileName, text, 'utf8', 777, (data, err)=>{
		if(err){
			console.log('couldn\'t write to file', err);
		}else{
			console.log('source file created!');
		}
	});
}

// Function to create and populate file in destination folder
const createAndPopulateDestFiles = ()=>{
	// console.log('streamValue is: ', streamValue);
	// console.log('args: ',args);
	if(args[streamValueInd] == 'true'){
		console.log('stream is true');
		let writeStream = fs.createWriteStream(DEST_DIR + '/' + srcFileName);
		writeStream.write(text);
		writeStream.on('finish', (err)=>{
			if(err){
				console.log('couldn\'t write to file using writeStream');
			}else{
				console.log('written to file using writeStream');
			}
		})
	}else{
		console.log('stream is false');
		// Look into permission issue in copyFileSync
		// fs.copyFileSync(srcFileName, DEST_DIR, (err)=>{
		fs.writeFileSync(DEST_DIR + '/' + srcFileName, text, (err)=>{
			if(err){
				console.log('couldn\'t write to dest folder', err);
			}else{
				console.log('written to dest folder');
			}
		});
	}
}

emitter.on('createFolders', ()=>{
	createEnvironmentFolders();
});

emitter.on('createSourceFiles', ()=>{
	createAndPopulateSourceFiles();
});

emitter.on('createDestFiles', ()=>{
	createAndPopulateDestFiles();
})

emitter.emit('createFolders');
emitter.emit('createSourceFiles');
emitter.emit('createDestFiles');

process.stdin.resume();
process.on('SIGINT',()=>{
    console.log("interrup received!");
    process.exit();
});