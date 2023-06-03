import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Chart1 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch("/api/exams/all")
      .then((response) => response.json())
      .then((data) => {
        // Extract the month from the date_time field
        const months = data.map((exam) => new Date(exam.date_time).getMonth());

        // Count the number of exams for each month
        const examCounts = {};
        months.forEach((month) => {
          examCounts[month] = (examCounts[month] || 0) + 1;
        });

        // Prepare the chart data
        const chartData = {
          labels: Object.keys(examCounts),
          datasets: [
            {
              label: "Number of Exams",
              data: Object.values(examCounts),
              fill: false,
              borderColor: colors.grey[100],
              backgroundColor: colors.grey[100],
              lineTension: 0.1,
            },
          ],
        };

        setChartData(chartData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Months",
                color: colors.grey[100],
              },
              grid: {
                color: colors.grey[100],
                borderColor: colors.grey[100],
              },
              ticks: {
                color: colors.grey[100],
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Number of Exams",
                color: colors.grey[100],
              },
              grid: {
                color: colors.grey[100],
                borderColor: colors.grey[100],
              },
              ticks: {
                color: colors.grey[100],
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: colors.grey[100],
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart1;
