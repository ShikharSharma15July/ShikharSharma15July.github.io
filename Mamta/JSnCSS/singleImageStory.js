$(document).ready(function () {
    // Get current image element
    var image = document.images[0];

    // Load all images immediately after loading this page
    var imageArr = [];
    var imageArrWithoutDialog = [];
    for (var i = 0; i <= totalImages; i++) {
        var img = document.createElement("img");
        img.src = i + ".jpg";

        var imgWithoutDialog = document.createElement("img");
        imgWithoutDialog.src = "org/" + i + ".jpg";

        if (i === 0) {
            // Change first images quality to hight
            img.onload = function () { image.src = this.src; }
        }
        // Keep all images for future (next and previous click);
        imageArr.push(img);
        imageArrWithoutDialog.push(imgWithoutDialog);
    }

    // Call next or previous click on right or left arrow click
    $(document).keydown(
        function (e) {
            if (e.keyCode === 39) { $("#next").click(); }
            if (e.keyCode === 37) { $("#previous").click(); }
        });

    var currentImage = 0;
    var showDialog = true;

    var changeImage = function () {
        if (showDialog) {
            image.src = imageArr[currentImage].src;
        } else {
            image.src = imageArrWithoutDialog[currentImage].src;
        }
    };

    $('#showDialogs').change(function () {
        showDialog = this.checked;
        changeImage();
    });

    $("#previous").click(function () {
        if (currentImage === 0) return; // do nothing
        currentImage = currentImage - 1;
        changeImage();
    });
    $("#next").click(function () {
        if (currentImage === totalImages - 1) return; // do nothing
        currentImage = currentImage + 1;
        changeImage();
    });
});