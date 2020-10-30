const moment = require('moment');
const fs = require('fs');

const EventEmitter = require('events');
class EvEmitter extends EventEmitter{};
const emitter = new EvEmitter();

// console.log(process.env.NODE_ENV);
var args = process.argv.slice(2);
var streamValueIndex = args.indexOf('--stream') + 1;
var nodeEnv = process.env.NODE_ENV;
var srcFileName = "";

function createAndPopulateSourceFiles(){
	console.log('inside createAndPopulateSourceFiles');
	srcFileName = moment().format('YYYY_MM_DD_HH_MM_SS') + ".txt";
	// let text = "some text!";
	let text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel fringilla ligula. In hac habitasse platea dictumst. Aliquam erat volutpat. Sed nec diam ut dui aliquam viverra. 
			    Phasellus tempor efficitur enim eget imperdiet. Nulla eget dapibus velit, at luctus odio. Mauris eu massa mauris.
				Ut nec sodales ante. Ut non odio dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
				cubilia curae; Duis consequat ligula et lectus pretium imperdiet. Aliquam vestibulum efficitur orci in vulputate. 
				Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer est urna, 
				vulputate et urna id, tincidunt mollis metus.`;

	if(nodeEnv == 'Dev'){
		fs.writeFile('./Dev/src/' + srcFileName, text, 'utf8', (err)=>{
			console.log('couldn\'t write to file', err);
		});
	}else{
		fs.writeFile('./production/src/' + srcFileName, text, 'utf8', (err)=>{
			console.log('couldn\'t write to file', err);
		});	
	}
}

// Handle createFolders event
emitter.on('createFolders', ()=>{
	let nodeEnv = process.env.NODE_ENV;
	if(nodeEnv == "Dev"){
		fs.access('./Dev', (err)=>{
			if(err){
				console.log('Dev does not exist, creating Dev folder');
				fs.mkdir("./Dev", (err)=>{
							if(err){
								console.log(err);
							}else{
								console.log("Dev folder created successfully!");
								// create the src and dest folders
								fs.mkdir("./Dev/src", (err)=>{
									if(err){
										console.log('src already exists');
									}else{
										console.log("src folder created");
									}
								});
								fs.mkdir("./Dev/dest", (err)=>{
									if(err){
										console.log("dest already exists");
									}else{
										console.log("dest folder created");
									}
								})
							}
						});				
			}else{
				// console.log('folder already exists');
				fs.access("./Dev/src", (err)=>{
					if(err){
						fs.mkdir("./Dev/src", (err)=>{
							if(err){
								console.log('some internal error while creating ./Dev/src');
							}else{
								console.log('src created');
							}
						});
					}
				}); // closing for src

				fs.access("./Dev/dest", (err)=>{
					if(err){
						fs.mkdir("./Dev/dest", (err)=>{
							if(err){
								console.log('some internal error while creating ./Dev/dest');
							}else{
								console.log('dest folder created successfully');
							}
						});
					}
				}); // closing for dest
			}// else
		});		
	}// closing for NODE_ENV="development"
	else if(nodeEnv == "production"){
		fs.access('./production', (err)=>{
			if(err){
				console.log('production does not exist, creating production folder');
				fs.mkdir("./production", (err)=>{
							if(err){
								console.log(err);
							}else{
								console.log("production folder created successfully!");
								// create the src and dest folders
								fs.mkdir("./production/src", (err)=>{
									if(err){
										console.log('production/src already exists');
									}else{
										console.log("production/src folder created");
									}
								});
								fs.mkdir("./production/dest", (err)=>{
									if(err){
										console.log("production/dest already exists");
									}else{
										console.log("production/dest folder created");
									}
								})
							}
						});				
			}else{
				// console.log('folder already exists');
				fs.access("./production/src", (err)=>{
					if(err){
						fs.mkdir("./production/src", (err)=>{
							if(err){
								console.log('some internal error while creating ./production/src');
							}else{
								console.log('production/src created');
							}
						});
					}
				}); // closing for src

				fs.access("./production/dest", (err)=>{
					if(err){
						fs.mkdir("./production/dest", (err)=>{
							if(err){
								console.log('some internal error while creating ./production/dest');
							}else{
								console.log('production/dest folder created successfully');
							}
						});
					}
				}); // closing for dest
			}// else
		});		
	}// closing for NODE_ENV="production"
	emitter.emit('createSourceFiles');
}); // closing for createFolders event


// Handle createSourceFile event
emitter.on('createSourceFiles', ()=>{
	console.log('event for creating source files');
	createAndPopulateSourceFiles();
});

emitter.on('createDestFiles', ()=>{
	if(streamValueIndex == 'true'){
		console.log('stream is true');
	}else{
		console.log(' stream is false');
		let src = './' + NODE_ENV + '/src/' + srcFileName;
		let dest = './' + NODE_ENV + 'dest';
		fs.access(src, (err)=>{
			if(err){
				console.log('source file does not exits');
			}else{
				fs.copyFile(src, dest);
			}
		});
	}
});

emitter.emit('createFolders');
// emitter.emit('createSourceFiles');
// emitter.emit('createDestFiles');