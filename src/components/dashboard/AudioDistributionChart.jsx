
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';

const data = [
    { name: 'Total audio', value: 200, percentage: 50 },
    { name: 'Short Duration Audio', value: 200, percentage: 14 },
    { name: 'Long Duration Audio', value: 200, percentage: 14 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AudioDistributionChart = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Audio Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="mt-4">
                {data.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center">
                            <span className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            <span>{`${index + 1}. ${entry.name}`}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2">{`+${entry.percentage}%`}</span>
                            <span>{entry.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioDistributionChart;
