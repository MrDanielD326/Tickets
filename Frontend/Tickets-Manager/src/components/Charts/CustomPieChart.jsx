import React from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CustomTooltipPie } from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, colors }) => (
    <ResponsiveContainer width={"100%"} height={325}>
        <PieChart>
            <Pie
                data={data}
                dataKey={"count"}
                nameKey={"status"}
                cx={"50%"}
                cy={"50%"}
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data?.length > 0 && data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltipPie />} />
            <Legend content={<CustomLegend />} />
        </PieChart>
    </ResponsiveContainer>
)

export default CustomPieChart