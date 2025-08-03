import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface ChartData {
  title: string;
  data: Array<[number, number | number[] | null]>;
}

interface ChartProps {
  chartData: ChartData;
}

const Chart: React.FC<ChartProps> = ({ chartData }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !chartData.data.length) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const firstDataPoint = chartData.data.find(d => d[1] !== null);
    if (!firstDataPoint) return;

    const isSingleSeries = typeof firstDataPoint[1] === 'number';

    if (isSingleSeries) {
      const validData = chartData.data.filter(d => d[1] !== null) as Array<[number, number]>;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(validData, d => d[0]) as [number, number])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain(d3.extent(validData, d => d[1]) as [number, number])
        .range([height, 0]);

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      g.append("g")
        .call(d3.axisLeft(yScale));

      const line = d3.line<[number, number]>()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]));

      g.append("path")
        .datum(validData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
    } else {
      const validData = chartData.data.filter(d => 
        d[1] !== null && Array.isArray(d[1])
      ) as Array<[number, number[]]>;

      const xScale = d3.scaleLinear()
        .domain(d3.extent(validData, d => d[0]) as [number, number])
        .range([0, width]);

      const allValues = validData.flatMap(d => d[1]);
      const yScale = d3.scaleLinear()
        .domain(d3.extent(allValues) as [number, number])
        .range([height, 0]);

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      g.append("g")
        .call(d3.axisLeft(yScale));

      const colors = ["blue", "green", "red"];
      
      for (let i = 0; i < 3; i++) {
        const seriesData = validData
          .filter(d => d[1][i] !== null && d[1][i] !== undefined)
          .map(d => [d[0], d[1][i]] as [number, number]);

        if (seriesData.length > 0) {
          const line = d3.line<[number, number]>()
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]));

          g.append("path")
            .datum(seriesData)
            .attr("fill", "none")
            .attr("stroke", colors[i])
            .attr("stroke-width", 2)
            .attr("d", line);
        }
      }
    }

  }, [chartData]);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{chartData.title}</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Chart;