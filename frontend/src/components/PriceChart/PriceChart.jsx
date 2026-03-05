import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PriceChart = (props) => {
  const { legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice, styleSet } = props;

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const ctx = canvasRef.current;

    const data = {
      labels: [Number(currPrice || 0).toFixed(2)],
      datasets: [
        {
          data: [Number(currPrice || 0).toFixed(2)],
          label: "Price",
          backgroundColor: "#10B981",
          borderColor: "#10B981",
          borderWidth: 2,
          pointRadius: 2,
          tension: 0.3,
        },
      ],
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
        y: { display: yDisplay },
      },
    };

    // destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: data,
      options: optionsSet,
    });

    let prevMsg = currPrice;

    socket.on(ticker, (msg) => {
      if (mounted && chartRef.current) {
        let length = data.labels.length;

        if (length >= 5) {
          data.datasets[0].data.shift();
          data.labels.shift();
        }

        if (msg > prevMsg) {
          data.datasets[0].borderColor = "#10B981";
          data.datasets[0].backgroundColor = "#10B981";
        } else {
          data.datasets[0].borderColor = "#EF4444";
          data.datasets[0].backgroundColor = "#EF4444";
        }

        prevMsg = msg;

        data.labels.push(new Date().getTime());
        data.datasets[0].data.push(Number(msg || 0).toFixed(2));

        chartRef.current.update();
      }
    });

    return () => {
      mounted = false;
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice]);

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%" }}
      className={styleSet}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PriceChart;