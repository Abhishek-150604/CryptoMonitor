// src/pages/CoinDetailPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const CoinDetailPage = () => {
  const { id } = useParams();
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
        );
        setHistoricalData(res.data.prices);
      } catch (err) {
        console.error("Error fetching historical data", err);
      }
    };
    fetchHistoricalData();
  }, [id]);

  const chartData = {
    labels: historicalData?.map((d) => {
      const date = new Date(d[0]);
      return date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `₹{id} Price (USD)`,
        data: historicalData?.map((d) => d[1]),
        fill: false,
        borderColor: "#FFD700",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 capitalize">{id} - 30 Day Price Chart</h2>
      {historicalData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default CoinDetailPage;
