import $ from "jquery";

export default function dragScroll(image) {
    let container = image.parent();

    //initial variables for drag event
    let isDown = false;
    let downPosX;
    let downPosY;
    let downImgPosX;
    let downImgPosY;
    let downScrollX;
    let downScrollY;

    // Zoom In Event
    let toggleZoom = (event) => {
        event.preventDefault();
        switch (true) {
            case event.target.classList.contains("image-file-zoom-1"):
                event.target.classList.add("image-file-zoom-2");
                event.target.classList.remove("image-file-zoom-1");
                container.addClass("image-container-zoom");
                break;
            default:
                event.target.className = "image-file image-file-zoom-1";
                container.removeClass("image-container-zoom");
                break;
        }
    };

    // Zoom out Event
    let toggleZoomInvert = (event) => {
        event.preventDefault();
        switch (true) {
            case event.target.classList.contains("image-file-zoom-1"):
                event.target.classList.add("image-file-zoom-2");
                event.target.classList.remove("image-file-zoom-1");
                container.addClass("image-container-zoom");
                break;
            case event.target.classList.contains("image-file-zoom-2"):
                event.target.classList.add("image-file-zoom-1");
                event.target.classList.remove("image-file-zoom-2");
                container.removeClass("image-container-zoom");
                break;
            default:
                return false;
        }
    };

    // Disable Some Default Events

    image[0].ondragstart = function () {
        return false;
    };

    image[0].oncontextmenu = function () {
        return false;
    };

    //Events

    //mousedown event records the click position, the position inside the image and the current scroll values
    image.on("mousedown", (event) => {
        isDown = true;
        downPosX = event.clientX;
        downPosY = event.clientY;
        downImgPosX = downPosX - container[0].offsetLeft;
        downImgPosY = downPosY - container[0].offsetTop;
        downScrollX = container[0].scrollLeft;
        downScrollY = container[0].scrollTop;
    });
    //  during the mousemove event, both x and y coordinate are calculated and are added/substracted to x/y scroll value of the container
    image.on("mousemove", (event) => {
        if (!isDown) return;
        event.preventDefault();
        const posX = event.clientX - container[0].offsetLeft;
        const moveX = posX - downImgPosX;
        container[0].scrollLeft = downScrollX - moveX;
        const posY = event.clientY - container[0].offsetTop;
        const moveY = posY - downImgPosY;
        container[0].scrollTop = downScrollY - moveY;
    });

    //if on the mouseup event, the mouse position is the same as during the mousedown (imitating a mouse click), the zoom event is toggled
    // else all value created during the mousedown event are reset
    image.on("mouseup", (event) => {
        if (event.clientY === downPosY && event.clientX === downPosX) {
            if (event.which === 1) {
                toggleZoom(event);
            } else if (event.which === 3) {
                toggleZoomInvert(event);
            }
            downPosX = 0;
            downPosY = 0;
            downImgPosX = 0;
            downImgPosY = 0;
            downScrollX = 0;
            downScrollY = 0;
        } else {
            downPosX = 0;
            downPosY = 0;
            downImgPosX = 0;
            downImgPosY = 0;
            downScrollX = 0;
            downScrollY = 0;
        }
        isDown = false;
    });

    //when the image is left all value during the mousedown event is reset
    image.on("mouseleave", (event) => {
        downPosX = 0;
        downPosY = 0;
        downImgPosX = 0;
        downImgPosY = 0;
        downScrollX = 0;
        downScrollY = 0;
        isDown = false;
    });
}
