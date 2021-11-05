import $ from "jquery";

export default function scrollIntoView(links) {
    let triggerScroll = (event) => {
        event.preventDefault();
        //only support link with id as href attributes
        $(event.target.hash)[0].scrollIntoView({
            behavior: "smooth",
        });
    };

    //set up click event for links
    links.on("click", triggerScroll);
}
