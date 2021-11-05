import $ from "jquery";

export default function ajaxContact(element, data) {
    const addContacts = () => {
        let contacts = "";
        for (const props in data) {
            contacts += `<li><strong>${props}: </strong>${data[props]}</li>`;
        }
        return contacts;
    };
    switch (true) {
        case $(element).attr("class").search("popup") !== -1:
            return $(element).prepend(`<ul class="popup-list">${addContacts()}</ul>`);
            break;
        case $(element).attr("class").search("about-letter") !== -1:
            return $(element).append(`<ul class="about-letter-list">${addContacts()}</ul>`);
        default:
            break;
    }
}
