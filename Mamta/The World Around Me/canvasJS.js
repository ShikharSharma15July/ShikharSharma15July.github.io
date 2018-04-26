function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.lineCap = 'round';
context.lineWidth = 5;
var down = false;
var xPos = 10;
var yPos = 10;
var x = document.getElementById('x');
var y = document.getElementById('y');
var now = document.getElementById('now');
var nextButton = document.getElementById('next');
var previousButton = document.getElementById('previous');
var pageNumber = document.getElementById('pageNumber');

var imageArr = [];
var chapter = getParameterByName('ch');
var totalImages = getParameterByName('p');
var currentPage = 1;

var pw = document.createElement("img");
pw.src = "PleaseWait.gif";
pw.onload = function () { context.drawImage(pw, 0, 0); }


for (var i = 1; i <= totalImages; i++) {
    var img = document.createElement("img");
    img.src = "Pages/" + chapter + "/" + i + ".jpg";
    if (i == 1) { img.onload = function () { context.drawImage(imageArr[0], 0, 0); } }
    imageArr.push(img);
}



canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', function()
{
	down = true;
	context.beginPath();
	context.moveTo(xPos, yPos);
	canvas.addEventListener("mousemove", draw);
});

document	.addEventListener('mouseup', function() {
	down = false;
});

function draw(e)
{
	xPos = e.clientX - 135;//canvas.offsetLeft;
	yPos = e.clientY - canvas.offsetTop + window.pageYOffset;	
	//x.value = ;	y.value = yPos; now.value = down;
	if(down == true)
	{
		context.lineTo(xPos, yPos);
		context.stroke();
	}
}

function changeColor(color) { context.strokeStyle = color; }
function clearCanvas() { context.clearRect(0, 0, canvas.width, canvas.height); context.drawImage(imageArr[currentPage-1], 0, 0); }
function changeBrushSize(size) { context.lineWidth = size; }
function next() {
    currentPage = currentPage + 1;
	pageNumber.innerHTML = currentPage;
    clearCanvas();
	if(currentPage == totalImages)
	{
		nextButton.style.display="none";
	}
	else
	{
		previousButton.style.display="block";
	}
}
function previous() {
    currentPage = currentPage - 1;
	pageNumber.innerHTML = currentPage;
    clearCanvas();
    if(currentPage == 1)
	{
		previousButton.style.display="none";
	}
	else
	{
		nextButton.style.display="block";
	}
}
