import $ from "jquery";

export default function ajaxProjects(element, data) {
    let count = 1;
    data.forEach((item) => {
        $(element).append(`
        <section class="projects-item">
            <h4 class="projects-item-name">${item["name"]}</h4>
            <p class="projects-item-quote">"${item["description"]}"</p>
            <button class="projects-item-image" data-toggle="modal" data-target="#modal${count}">
                <div class="projects-item-imageFile">
                    <img src="${item["image"]}" alt="${item["name"]} thumbnail" />
                </div>
                <div class="projects-item-view">View</div>
            </button>
            <div class="projects-item-buttons">
                <a href="${item["code"]}" class="btn btn-custom" target="_blank">View Code</a>
                <a href="${item["website"]}" class="btn btn-custom" target="_blank">Visit Website</a>
            </div>
        </section>
        `);
        $("body").append(`
        <div class="modal" tabindex="-1" id="modal${count}">
            <div class="container-xl modal-dialog">
                <section class="modal-content">
                    <div class="image-container">
                        <img
                            src="${item["image"]}"
                            alt="${item["name"]} image"
                            class="image-file image-file-zoom-1"
                            data-toggle="imageViewer"
                        />
                    </div>
                    <div class="modal-footer image-footer">
                        <p class="font-weight-bold">
                            Left-click or right-click to zoom-in or zoom-out of the image.<br />Left-click and drag your mouse to scroll through
                            the image.
                        </p>
                        <button type="button" class="btn btn-custom" data-dismiss="modal">Close Image</button>
                    </div>
                </section>
            </div>
        </div>
        `);
        count++;
    });
}
