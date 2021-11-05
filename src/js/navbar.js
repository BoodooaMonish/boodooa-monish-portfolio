import $ from "jquery";

//Navbar Function
export default function navbar(button, backdrop, properties) {
    let container = $("#" + $(button).attr("data-target"));
    //function that fires to hide the menu after transition is ended
    let hideMenu = () => {
        container.addClass(properties.hideMenu);
        container.removeClass(properties.menuDisplayed);
    };
    //function that toggles menu when transitions [supports display --> none]
    let toggleMenu = () => {
        if (container.hasClass(properties.menuDisplayed)) {
            container.one("transitionend", hideMenu).addClass(properties.menuHidden);
            button.attr("aria-expanded", "false");
            backdrop.addClass(properties.backdropHide);
            $("body").css("overflow", "");
            button.focus();
        } else if (container.hasClass(properties.menuHidden)) {
            container.removeClass(properties.hideMenu);
            if (container.css("display") === properties.containerCSSDisplay) {
                container.addClass(properties.menuDisplayed).removeClass(properties.menuHidden);
            }
            button.attr("aria-expanded", "true");
            backdrop.removeClass(properties.backdropHide);
            $("body").css("overflow", "hidden");
            container.children(":first-child").focus();
        }
    };
    // keyboard support for tab, shift+tab, escape, enter
    let handleMenuKey = (event) => {
        let target = event.target;
        switch (event.key) {
            case "Tab":
                event.preventDefault();
                // tab and there is an element next to the target
                if (!event.shiftKey && event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                } else if (event.shiftKey && event.target.previousElementSibling) {
                    // shift+tab and there is an element previous to the target
                    event.target.previousElementSibling.focus();
                } else if (!event.shiftKey && !event.target.nextElementSibling) {
                    // tab and there is not an element next to the target
                    container["0"].firstElementChild.focus();
                    // shift+tab and there is not an element previous to the target
                } else if (event.shiftKey && !event.target.previousElementSibling) {
                    container["0"].lastElementChild.focus();
                }
                break;
            case "Escape":
                event.preventDefault();
                toggleMenu();
                break;
            case "Enter":
                event.preventDefault();
                target.click();
            default:
                break;
        }
    };
    //onlick menu toggling event handler for menu button
    button.on("click", function (e) {
        e.preventDefault();
        return toggleMenu();
    });
    //onlick support for backdrop [closes menu]
    backdrop.on("click", function (e) {
        e.stopPropagation();
        return toggleMenu();
    });
    //onlick support when a link in menu is click [closes menu]
    container.on("click", function (e) {
        e.stopPropagation();
        if (container.css("display") !== "none" && window.innerWidth < properties.hamburgerTriggerPoint) {
            if (e.target.classList.contains(properties.menuLink)) {
                return toggleMenu();
            }
        }
    });
    //keyboard support event handler
    container.on("keydown", function (e) {
        e.stopPropagation();
        if (container.css("display") !== "none" && button.css("display") !== "none") {
            if (e.target.classList.contains(properties.menuLink)) {
                return handleMenuKey(e);
            }
        }
    });
}
