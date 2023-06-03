import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography } from "@mui/material";

const BarChart = ({ isDashboard = false }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/exams/all");
        const data = await response.json();

        const examCounts = {};
        data.forEach((exam) => {
          const month = new Date(exam.dateTime).getMonth();
          examCounts[month] = (examCounts[month] || 0) + 1;
        });

        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "September", "October", "November", "December"
        ];

        const chartData = monthNames.map((month, index) => ({
          month,
          exams: examCounts[index] || 0,
        }));

        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box height="280px">
      <ResponsiveBar
        data={chartData}
        keys={["exams"]}
        indexBy="month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }} // Use a color scheme that provides multiple colors
        colorBy={(bar) => bar.indexValue} // Assign a unique color to each bar
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Month",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Number of Exams",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        barAriaLabel={(e) => `${e.indexValue}: ${e.value} exams`}
      />
    </Box>
  );
};

export default BarChart;
