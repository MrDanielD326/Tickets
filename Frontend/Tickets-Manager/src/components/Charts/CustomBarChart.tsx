import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltipBar } from './CustomTooltip';

const CustomBarChart = ({ data }) => {
    // Function to alternate colors
    const getBarColor = (entry) => {
        switch (entry) {
            case 'High': return "#FF1F57";
            case 'Medium': return "#FE9900";
            case 'Low': return "#00BC7D";
            default: return "#00BC7D";
        }
    };

    return (
        <div className=''>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="priority" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    {/* <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'transparent' }} /> */}
                    <Bar
                        dataKey={"count"}
                        fill='#FF8042'
                        radius={[10, 10, 0, 0]}
                        // nameKey="priority"
                        // activeDot={{ r: 8, fill: "yellow" }}
                        // activeStyle={{ fill: 'green' }}
                    >
                        {data?.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(entry)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart