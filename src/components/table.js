import { cloneTemplate } from "../lib/utils.js";

export function initTable(settings, onAction) {
    const { tableTemplate, rowTemplate, before, after } = settings;
    const root = cloneTemplate(tableTemplate);

    const beforeList = before ? [...before].reverse() : [];
    const afterList = after ? [...after] : [];

    beforeList.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
    });

    afterList.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
    });

    const form = root.container.closest('form');
    form.addEventListener('change', () => onAction());
    form.addEventListener('reset', () => setTimeout(() => onAction()));
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });

    const render = (data) => {
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => {
                if (row.elements[key]) {
                    row.elements[key].textContent = item[key];
                }
            });
            return row.container;
        });
        root.elements.rows.replaceChildren(...nextRows);
    };

    return { ...root, render };
}