
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const donorGrowthData = [
    { month: 'Jan', donors: 55 },
    { month: 'Feb', donors: 115 },
    { month: 'Mar', donors: 85 },
    { month: 'Apr', donors: 100 },
    { month: 'May', donors: 125 },
    { month: 'Jun', donors: 150 },
    { month: 'Jul', donors: 160 },
    { month: 'Aug', donors: 190 },
    { month: 'Sep', donors: 170 },
    { month: 'Oct', donors: 210 },
    { month: 'Nov', donors: 220 },
    { month: 'Dec', donors: 180 },
];

const DonorGrowthChart = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Donor Growth</h2>
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
                <AreaChart data={donorGrowthData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="donors" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DonorGrowthChart;
