import $ from "jquery";

export default function popup(button, properties) {
    let container = $("#" + $(button).attr("data-target"));
    let closeBtn = container.children("[data-close='popup']");
    //function that fires to hide the popup after transition is ended
    let hidePopup = () => {
        container.addClass(properties.hidePopup);
        container.removeClass(properties.popupDisplayed);
    };
    //function that toggles popup when transitions [supports display --> none]
    let togglePopup = () => {
        if (container.hasClass(properties.popupDisplayed)) {
            container.one("transitionend", hidePopup).addClass(properties.popupHidden);
            button.attr("aria-expanded", "false");
            button.focus();
        } else if (container.hasClass(properties.popupHidden)) {
            container.removeClass(properties.hidePopup);
            if (container.css("display") === properties.containerCSSDisplay) {
                container.addClass(properties.popupDisplayed).removeClass(properties.popupHidden);
            }
            button.attr("aria-expanded", "true");
            closeBtn.focus();
            document.scrollingElement.scrollTop = 0;
        }
    };
    //onlick popup toggling event handler for menu button
    button.on("click", function (e) {
        e.preventDefault();
        return togglePopup();
    });
    closeBtn.on("click", function (e) {
        e.preventDefault();
        return togglePopup();
    });
}
