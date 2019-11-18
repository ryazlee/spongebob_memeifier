// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

var bkg = chrome.extension.getBackgroundPage();

document.getElementById('inp').addEventListener('keyup', (event) => {
  var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
	let memeText = event.target.value.split('').map(function(v) {
    var chance = Math.round(Math.random());
    return v = chance ? v.toUpperCase() : v.toLowerCase();
	}).join('');
	
  var imageObj = new Image();
  imageObj.onload = function(){
    ctx.drawImage(imageObj, 0, 0);
    ctx.font = "15pt Arial";
    ctx.fillText(memeText, 10, 20);
		document.getElementById('dis_img').src = canvas.toDataURL();
		document.getElementById('dis_img').style.display = "block";
  };
  imageObj.src = "./meme.jpg"; 
});

