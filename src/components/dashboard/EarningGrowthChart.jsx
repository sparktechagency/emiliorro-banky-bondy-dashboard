
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const earningGrowthData = [
    { month: 'Jan', earnings: 55 },
    { month: 'Feb', earnings: 115 },
    { month: 'Mar', earnings: 85 },
    { month: 'Apr', earnings: 100 },
    { month: 'May', earnings: 125 },
    { month: 'Jun', earnings: 150 },
    { month: 'Jul', earnings: 50 },
    { month: 'Aug', earnings: 190 },
    { month: 'Sep', earnings: 170 },
    { month: 'Oct', earnings: 210 },
    { month: 'Nov', earnings: 220 },
    { month: 'Dec', earnings: 100 },
];

const EarningGrowthChart = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Earning Growth</h2>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={earningGrowthData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EarningGrowthChart;
