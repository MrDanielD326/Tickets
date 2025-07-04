import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, TooltipProps } from 'recharts';

interface BarChartData {
    priority: string;
    count: number;
}

interface CustomBarChartProps {
    data: BarChartData[];
    colors: string[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { priority, count } = payload[0].payload as BarChartData;
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-purple-800 mb-1">{priority}</p>
                <p className="text-sm text-gray-600">
                    Count: <span className="text-sm font-medium text-gray-900">{count}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data, colors }) => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="priority" tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
            <YAxis tick={{ fontSize: 12, fill: '#555' }} stroke="none" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Bar>
        </BarChart>
    </ResponsiveContainer>
);

export default CustomBarChart;
