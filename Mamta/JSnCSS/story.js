$(document).ready(function () {
	// Get current image elements
	var image0 = document.images[0];
	var image1 = document.images[1];
	
	// Load all images immediately after loading this page
	var imageArr = [];		
	for(var i = 0; i<= totalImages; i++)
	{
		var img = document.createElement("img");
		img.src = i + ".jpg";
		if(i  < 2)
		{
			// Change first 2 low quality images to hight quality
			if(i==0){ img.onload = function() { image0.src = this.src; } }
			else { img.onload = function() { image1.src = this.src; } }
		}
		// Keep all images for future (next and previous click);
		imageArr.push(img);
	}			

	// Call next or previous click on right or left arrow click
	$(document).keydown(
	function(e)
	{
		if (e.keyCode == 39) { $("#next").click(); }
		if (e.keyCode == 37) { $("#previous").click(); }
	});
	
	var currentImage = 0;
	$("#previous").click(function () {
		if(currentImage == 0) return; // do nothing
		currentImage = currentImage - 2;
		image0.src = imageArr[currentImage].src;
		image1.src = imageArr[currentImage+1].src;
	});
	$("#next").click(function () {
		if(currentImage == totalImages - 1) return; // do nothing
		currentImage = currentImage + 2;
		image0.src = imageArr[currentImage].src;
		image1.src = imageArr[currentImage+1].src;
	});
});