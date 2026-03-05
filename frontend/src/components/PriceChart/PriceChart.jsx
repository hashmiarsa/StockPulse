import React, { useEffect } from "react";
import { Chart, registerables } from 'chart.js';

const PriceChart = (props) => {
  const { id, legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice, styleSet } = props;
  Chart.register(...registerables);

  useEffect(() => {
    let mounted = true;
    const ctx = document.getElementById(id);
    const data = {
    labels: [Number(currPrice || 0).toFixed(2)],
    datasets: [{
      data: [Number(currPrice || 0).toFixed(2)],
      label: 'Price',
      backgroundColor: '#10B981',
      borderColor: '#10B981',
      borderWidth: 2,
      pointRadius: 2,
      tension: 0.3,
    }]
  };

    const optionsSet = {
      animation: false,
      plugins: {
        legend: { display: legendDisplay },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: xDisplay },
        y: { display: yDisplay }
      }
    };

    const chartDrawn = new Chart(ctx, {
      type: 'line',
      data: data,
      options: optionsSet
    });

    let prevMsg = currPrice;
    socket.on(ticker, msg => {
      if (mounted) {
        let length = data.labels.length;
        if (length >= 5) {
          data.datasets[0].data.shift();
          data.labels.shift();
        }
        if (msg > prevMsg) {
          data.datasets[0].borderColor = '#10B981';
          data.datasets[0].backgroundColor = '#10B981';
        } else {
          data.datasets[0].borderColor = '#EF4444';
          data.datasets[0].backgroundColor = '#EF4444';
        }
        prevMsg = msg;
        data.labels.push(new Date().getTime());
        data.datasets[0].data.push(parseFloat(msg).toFixed(2));
        chartDrawn.update();
      }
    });

    return () => {
      mounted = false;
      chartDrawn.destroy();
    };
  }, [id, legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }} className={styleSet}>
      <canvas id={id}></canvas>
    </div>
  );
}

export default PriceChart;
