// For debugging, use bkg.console.log(msg)
var bkg = chrome.extension.getBackgroundPage();

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var width = 200
var height = 200
var fontFamily = "Arial"
var fontSize = "15px"

// On keyup, add the text to the meme pic
document.getElementById('input_text').addEventListener('keyup', (event) => {
	let memeText = convertToMemeText(event.target.value) 
  var imageObj = new Image();
  imageObj.onload = function(){
    ctx.drawImage(imageObj, 0, 0);
    ctx.font = "15pt Arial";
		var lines = fragmentText(memeText, width - parseInt(fontSize));
		lines.forEach(function(line, i) {
        ctx.fillText(line, parseInt(fontSize)/2, (i + 1) * parseInt(fontSize,0) + 1);
    });
		ctx.restore();
		document.getElementById('dis_img').src = canvas.toDataURL();
		document.getElementById('dis_img').style.display = "block";
		document.getElementById('help_text').style.display = "block";
  };
  imageObj.src = "./meme.jpg"; 
});

// Helper functions
function fragmentText(text, maxWidth) {
	var words = text.split(' '),
  	lines = [],
   	line = "";
 	if (ctx.measureText(text).width < maxWidth) {
  	return [text];
  }
 	while (words.length > 0) {
  	while (ctx.measureText(words[0]).width >= maxWidth) {
    	var tmp = words[0];
			words[0] = tmp.slice(0, -1);
			if (words.length > 1) {
				words[1] = tmp.slice(-1) + words[1];
			} else {
				words.push(tmp.slice(-1));
			}
		}
		if (ctx.measureText(line + words[0]).width < maxWidth) {
			line += words.shift() + " ";
		} else {
			lines.push(line);
			line = "";
		}
		if (words.length === 0) {
			lines.push(line);
		}
	}
	return lines;
}

function convertToMemeText(text) {
  let memeText = text.split('').map(function(v) {
  var chance = Math.round(Math.random());
    return v = chance ? v.toUpperCase() : v.toLowerCase();
  }).join('');
  return memeText;
}


