import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomBarChart = ({ data }) => {
    const getBarColor = (priority) => {
        switch (priority) {
            case 'High': return '#FF1F57';
            case 'Medium': return '#FE9900';
            case 'Low': return '#00BC7D';
            default: return '#00BC7D';
        }
    };

    const tooltipContent = () => (
        <Tooltip cursor={{ fill: 'transparent' }}
            content={({ active, payload }) => active && payload?.length && (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1"> {payload[0]?.payload?.priority} </p>
                    <p className="text-sm text-gray-600">
                        Count: <span className="text-sm font-medium text-gray-900"> {payload[0]?.payload?.count} </span>
                    </p>
                </div>
            )}
        />
    );

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey="priority" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
                    {tooltipContent()}
                    <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {data?.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(entry.priority)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
