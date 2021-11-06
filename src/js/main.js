//Import jQuery
import $ from "jquery";
//Import Bootstrap Javascript Files

// import "../../node_modules/bootstrap/js/dist/alert";
import "../../node_modules/bootstrap/js/dist/button";
// import "../../node_modules/bootstrap/js/dist/carousel";
import "../../node_modules/bootstrap/js/dist/collapse";
// import "../../node_modules/bootstrap/js/dist/dropdown";
// import "../../node_modules/bootstrap/js/dist/index";
import "../../node_modules/bootstrap/js/dist/modal";
// import "../../node_modules/bootstrap/js/dist/popover";
// import "../../node_modules/bootstrap/js/dist/scrollspy";
// import "../../node_modules/bootstrap/js/dist/tab";
// import "../../node_modules/bootstrap/js/dist/toast";
// import "../../node_modules/bootstrap/js/dist/tooltip";
import "../../node_modules/bootstrap/js/dist/util";

//Import Stylesheet
import "../scss/main.scss";

import navbar from "./navbar";
import popup from "./popup";
import scrollIntoView from "./scrollIntoView";
import dragScroll from "./dragscroll";
import ajaxIntroduction from "./ajax_introduction";
import ajaxContact from "./ajax_contact";
import ajaxSkills from "./ajax_skills";
import ajaxProjects from "./ajax_projects";
import ajaxError from "./ajax_error";

//remove loading
$(window).on("load", function () {
    $(".loading").remove();
});
$(function () {
    //fetch JSON
    $.getJSON("./information.json")
        .then(function (data) {
            $("[data-ajax]").each((index, value) => {
                switch ($(value).attr("data-ajax")) {
                    case "introduction":
                        ajaxIntroduction(value, data["introduction"]);
                        break;
                    case "contact":
                        ajaxContact(value, data["contact"]);
                        break;
                    case "skills":
                        ajaxSkills(value, data["skills"]);
                        break;
                    case "projects":
                        ajaxProjects(value, data["projects"]);
                        break;
                    default:
                        break;
                }
            });
            // initiate Navbar
            navbar($("[data-toggle='navbar']"), $("[data-toggle='backdrop']"), {
                menuDisplayed: "menu-displaying",
                hideMenu: "menu-hide",
                menuHidden: "menu-hidding",
                containerCSSDisplay: "flex",
                backdropHide: "backdrop-hide",
                menuLink: "nav-item",
                hamburgerTriggerPoint: "576",
            });

            //scrollIntoView
            scrollIntoView($("a.nav-link-custom"));

            //initiate contact-popup
            popup($("[data-toggle='popup']"), {
                popupDisplayed: "popup-displaying",
                hidePopup: "popup-hide",
                popupHidden: "popup-hidding",
                containerCSSDisplay: "flex",
            });

            //initiate image zoom and click drag scroll
            $("[data-toggle='imageViewer']").each((index, value) => {
                dragScroll($(value));
            });

            //add footer text
            $("#dateNow").text(`${new Date().getFullYear()}`);
        })
        .catch(function () {
            $(".loading").remove();
            $("body").prepend(ajaxError());
        });
});
