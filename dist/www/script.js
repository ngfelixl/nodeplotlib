"use strict";
window.addEventListener('load', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/data');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const container = JSON.parse(xhr.responseText);
            const element = document.getElementById('container');
            if (element) {
                for (let i = 0; i < container.length; i++) {
                    const toAppend = document.createElement('div');
                    toAppend.id = `container_${i}`;
                    element.appendChild(toAppend);
                    Plotly.newPlot(`container_${i}`, container[i]);
                }
            }
        }
    };
    xhr.send();
});
//# sourceMappingURL=script.js.map