// export default Explore;
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Explore = () => {
  const [categoryData, setCategoryData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        const categories = data || [];
        const categoryCountPromises = categories.map((category, index) =>
          fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => res.json())
            .then((data) => ({
              category,
              count: data.products.length,
              colorIndex: index,
            }))
        );
        Promise.all(categoryCountPromises).then((categoryCounts) => {
          setCategoryData(categoryCounts);
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    if (categoryData.length > 0) {
      const ctx = document.getElementById("categoryChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: categoryData.map((data) => data.category),
          datasets: [
            {
              label: `No. of products are`,
              data: categoryData.map((data) => data.count),
              backgroundColor: categoryData.map((data) =>
                generateColor(data.colorIndex)
              ),
              borderColor: categoryData.map((data) =>
                generateColor(data.colorIndex)
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      chartRef.current = chart;
    }
  }, [categoryData]);

  const generateColor = (index) => {
    const colors = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
      "rgba(75, 192, 192, 0.5)",
      "rgba(153, 102, 255, 0.5)",
      "rgba(255, 159, 64, 0.5)",
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
      "rgba(75, 192, 192, 0.5)",
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    console.log(categoryData); // This will log the category data
  }, [categoryData]);

  return (
    <div className="flex flex-col items-center bg-slate-200 justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Product Distribution by Category
        </h1>
      </div>
      <div>
        <canvas id="categoryChart" width="600" height="600"></canvas>
      </div>
    </div>
  );
};

export default Explore;
