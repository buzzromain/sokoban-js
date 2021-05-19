//Source : https://www.proglogic.com/code/javascript/time/chronometer.php

var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0

export function chrono(){
	end = new Date()
	diff = end - start
	diff = new Date(diff)
	var msec = diff.getMilliseconds()
	var sec = diff.getSeconds()
	var min = diff.getMinutes()
	var hr = diff.getHours()-1
	if (min < 10){
		min = "0" + min
	}
	if (sec < 10){
		sec = "0" + sec
	}
	if(msec < 10){
		msec = "00" +msec
	}
	else if(msec < 100){
		msec = "0" +msec
	}
	document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
	timerID = setTimeout(chrono, 10)
}

export function chronoStart(){
	start = new Date()
	chrono();
}

export function chronoContinue(){
	start = new Date() - diff
	start = new Date(start)
	chrono();
}
export function chronoReset(){
	document.getElementById("chronotime").innerHTML = "0:00:00:000"
	start = new Date()
}
export function chronoStopReset(){
	document.getElementById("chronotime").innerHTML = "0:00:00:000"
}
export function chronoStop(){
	clearTimeout(timerID);
}