import React, { useState, useEffect } from "react";
import productService from "./../services/ProductsService";
import { Line } from "react-chartjs-2";

const Charts = () => {
  const [chartData, setChartData] = useState({});

  const chart = () => {
    productService.getRecord()
      .then(res => {
        let bloodSugar = []
        let carbohydrates = []
        let time = []
        for (let data of res){
            bloodSugar.push(data.Blood_Sugar_Level)
            carbohydrates.push(data.Amount_of_Carbohydrate)
            time.push(new Date(data.Time).toLocaleString())
        }
        console.log(bloodSugar);
        setChartData({
          labels: time,
          datasets: [
            {
              label: "Blood Sugar",
              data: bloodSugar,
              backgroundColor: ["rgba(242, 42, 139,0.7)"],
              borderWidth: 4
            },
            {
                label: "Carbohydratea",
                data: carbohydrates,
                backgroundColor: ['rgba(242, 126, 42,0.8)'],
                borderWidth: 4
              }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Blood Sugar</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Diabeties Performance", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
