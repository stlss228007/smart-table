import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    Object.keys(indexes).forEach(elementName => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const parent = action.closest('fieldset');
            const input = parent.querySelector('input, select');
            if (input) {
                input.value = '';
                state[input.name] = '';
            }
        }
        return data.filter(row => compare(row, state));
    };
}