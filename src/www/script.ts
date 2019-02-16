let containers = 0;
      
window.addEventListener('load', () => {
  const element = document.getElementById('container');
  const plotId = element && element.dataset.plotid;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:{{port}}/data/${plotId}`);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.responseText) {
        const stack = JSON.parse(xhr.responseText);
  
        if (element) {
          containers = stack.length;
          for (let i = 0; i < stack.length; i++) {
            const toAppend = document.createElement('div');
            toAppend.id = `container_${i}`;
            element.appendChild(toAppend);
            const plot = stack[i];
            Plotly.newPlot(`container_${i}`, plot.data, plot.layout);
          }
        }
      }
    }
  };

  xhr.send();
});

window.addEventListener('resize', () => {
  const update = {
    width: window.innerWidth
  };

  for (let i = 0; i < containers; i++) {
    Plotly.relayout(`container_${i}`, update);
  }
});
