import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isStacked, setIsStacked] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [showReport, setShowReport] = useState(null);
  const data = useSelector((store) => store.details[0]);

  useEffect(() => {
    fetchShowReport();
  }, [id]);

  useEffect(() => {
    if (showReport) {
      updateChartData();
    }
  }, [showReport, isStacked]);

  const fetchShowReport = async () => {
    await dispatch({ type: "FILTER_REPORT", payload: id });
    await setShowReport(data);
  };

  const updateChartData = () => {
    const labels = isStacked
      ? ["Tickets", "Drinks"]
      : ["Tickets", "Presale", "Beer", "Liquor", "Other"];
    const datasets = isStacked ? getStackedDatasets() : getUnstackedDatasets();

    setChartData({
      labels,
      datasets,
    });
  };

  const getUnstackedDatasets = () => [
    {
      label: "Sales Volume",
      data: [
        showReport.total_tickets_sold,
        showReport.total_presale_sold,
        showReport.total_beer_sold,
        showReport.total_liquor_sold,
        showReport.total_other_sold,
      ],
      backgroundColor: [
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
      ],
    },
  ];

  const getStackedDatasets = () => [
    {
      label: "Presale Tickets",
      data: [showReport.total_presale_sold, 0],
      backgroundColor: "rgba(153, 102, 255, 0.6)",
      stack: "Stack 0",
    },
    {
      label: "All Tickets",
      data: [showReport.total_tickets_sold, 0],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      stack: "Stack 0",
    },
    {
      label: "Beer",
      data: [0,showReport.total_beer_sold],
      backgroundColor: "rgba(255, 159, 64, 0.6)",
      stack: "Stack 1",
    },
    {
      label: "Liquor",
      data: [0,showReport.total_liquor_sold],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      stack: "Stack 1",
    },
    {
      label: "Other",
      data: [0,showReport.total_other_sold],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      stack: "Stack 1",
    },
  ];

  const options = {
    responsive: true,
    scales: {
      x: { stacked: isStacked },
      y: { stacked: isStacked },
    },
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: isStacked
          ? `Stacked Bar Chart: Show ${id}`
          : `Unstacked Bar Chart: Show ${id}`,
      },
    },
  };

  const handleClick = () => {
    setIsStacked(!isStacked);
  };

  // if (!showReport) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="chart-container">
      <button onClick={() => history.push("/")}>Back to Table</button>
      {chartData ? (
        <>
          <div style={{ width: "800px", height: "400px" }}>
            <Bar data={chartData} options={options} onClick={handleClick} />
          </div>
          <p>Click on the chart to toggle between stacked and unstacked view</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChartSection;
