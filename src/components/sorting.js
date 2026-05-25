import { sortCollection, sortMap } from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            action.dataset.value = sortMap[action.dataset.value];
            field = action.dataset.field;
            order = action.dataset.value;
            columns.forEach(col => {
                if (col !== action && col.dataset.field !== field) {
                    col.dataset.value = 'none';
                }
            });
        } else {
            columns.forEach(col => {
                if (col.dataset.value !== 'none') {
                    field = col.dataset.field;
                    order = col.dataset.value;
                }
            });
        }

        if (field && order && order !== 'none') {
            return sortCollection(data, field, order);
        }
        return data;
    };
}