import $ from "jquery";

export default function ajaxSkills(element, data) {
    const addItem = (arr) => {
        let str = "";
        arr.forEach((item) => {
            str += `<li class="skills-list-item">${item}</li>`;
        });
        return str;
    };
    for (const props in data) {
        $(element).append(`
        <section class="skills-list">
            <h4 class="skills-list-heading">${props}</h4>
            <ul class="skills-list-items">${addItem(data[props])}</ul>
        </section>
    `);
    }
}
