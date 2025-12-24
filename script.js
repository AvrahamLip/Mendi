import { calculatorConfig } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        width: 1.0,
        height: 2.1,
        leafType: 'single',
        profit: 30,
        selectedOptionals: new Set(), // Store IDs of selected optional items
        customQuantities: {} // Store overrides for quantities
    };

    // DOM Elements
    const elements = {
        title: document.getElementById('app-title'),
        subtitle: document.getElementById('app-subtitle'),
        widthInput: document.getElementById('width'),
        heightInput: document.getElementById('height'),
        singleLeaf: document.getElementById('single-leaf'),
        doubleLeaf: document.getElementById('double-leaf'),
        profitInput: document.getElementById('profit'),
        finalPrice: document.getElementById('final-price'),
        materialCost: document.getElementById('material-cost'),
        laborCost: document.getElementById('labor-cost'),
        breakdownContainer: document.getElementById('breakdown-container')
    };

    // Initialize UI from Config
    const init = () => {
        elements.title.textContent = calculatorConfig.title;
        elements.subtitle.textContent = calculatorConfig.subtitle;

        // Pre-select some optionals if desired (optional)
        calculate();
    };

    // Safe evaluation of formulas
    const evaluateFormula = (formula, width, height) => {
        try {
            const safeFormula = formula
                .replace(/width/g, width)
                .replace(/height/g, height);
            return eval(safeFormula);
        } catch (e) {
            console.error('Formula error:', formula, e);
            return 0;
        }
    };

    const calculate = () => {
        const { width, height, leafType, profit, selectedOptionals } = state;
        let totalMaterialCost = 0;
        let totalLaborCost = 0;

        // Reset Breakdown
        elements.breakdownContainer.innerHTML = '';

        // Calculate each category
        calculatorConfig.categories.forEach(category => {
            const section = document.createElement('section');
            section.className = 'table-container card';

            let tableHTML = `
                <h2>${category.name}</h2>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 40px;"></th>
                            <th>פריט</th>
                            <th>יצרן</th>
                            <th>כמות</th>
                            <th>יחידה</th>
                            <th>מחיר יח'</th>
                            <th>סה"כ</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            category.items.forEach(item => {
                const isSelected = item.mandatory || selectedOptionals.has(item.id);

                // We show all items, but only calculate if selected
                const formula = leafType === 'single' ? item.formulaSingle : item.formulaDouble;
                const formulaResult = evaluateFormula(formula, width, height);

                // Use custom quantity if set, otherwise use formula result
                const quantity = state.customQuantities[item.id] !== undefined ?
                    state.customQuantities[item.id] : formulaResult;

                const itemTotal = quantity * item.price;

                if (isSelected) {
                    totalMaterialCost += itemTotal;
                }

                tableHTML += `
                    <tr class="${!isSelected ? 'dimmed' : ''}">
                        <td>
                            ${!item.mandatory ? `
                                <input type="checkbox" class="item-selector" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
                            ` : `
                                <div class="mandatory-dot" title="פריט חובה"></div>
                            `}
                        </td>
                        <td>${item.name}</td>
                        <td><small>${item.manufacturer}</small></td>
                        <td>
                            <input type="number" 
                                   class="qty-input" 
                                   data-id="${item.id}" 
                                   value="${quantity.toFixed(2)}" 
                                   step="0.01" 
                                   min="0">
                        </td>
                        <td>${item.unit}</td>
                        <td>${item.price}${calculatorConfig.currency}</td>
                        <td class="highlight-price">${isSelected ? itemTotal.toFixed(2) : '0.00'}${calculatorConfig.currency}</td>
                    </tr>
                `;
            });

            tableHTML += `</tbody></table>`;
            section.innerHTML = tableHTML;
            elements.breakdownContainer.appendChild(section);
        });

        // Add Global Costs
        const manufacturing = calculatorConfig.globalCosts.manufacturing[leafType];
        const installation = calculatorConfig.globalCosts.installation[leafType];
        totalLaborCost = manufacturing + installation;

        // Update Totals
        elements.materialCost.textContent = totalMaterialCost.toFixed(0) + calculatorConfig.currency;
        elements.laborCost.textContent = totalLaborCost.toFixed(0) + calculatorConfig.currency;

        const baseCost = totalMaterialCost + totalLaborCost;
        const finalPrice = baseCost * (1 + profit / 100);

        animateValue(elements.finalPrice, parseFloat(elements.finalPrice.textContent.replace(/,/g, '')) || 0, finalPrice, 300);

        // Add event listeners to checkboxes (re-attach after render)
        document.querySelectorAll('.item-selector').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                if (e.target.checked) {
                    state.selectedOptionals.add(id);
                } else {
                    state.selectedOptionals.delete(id);
                }
                calculate();
            });
        });

        // Add event listeners to quantity inputs
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                state.customQuantities[id] = parseFloat(e.target.value) || 0;
                calculate();
            });
            input.addEventListener('input', (e) => {
                const id = e.target.dataset.id;
                state.customQuantities[id] = parseFloat(e.target.value) || 0;
                calculate();
            });
        });
    };

    const animateValue = (obj, start, end, duration) => {
        if (start === end) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = Math.floor(progress * (end - start) + start);
            obj.innerHTML = val.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Event Listeners
    elements.widthInput.addEventListener('input', (e) => {
        state.width = parseFloat(e.target.value) || 0;
        calculate();
    });

    elements.heightInput.addEventListener('input', (e) => {
        state.height = parseFloat(e.target.value) || 0;
        calculate();
    });

    [elements.singleLeaf, elements.doubleLeaf].forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.leafType = e.target.value;
            calculate();
        });
    });

    elements.profitInput.addEventListener('input', (e) => {
        state.profit = parseFloat(e.target.value) || 0;
        calculate();
    });

    init();
});
