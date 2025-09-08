
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const userGrowthData = [
    { month: 'Jan', users: 45 },
    { month: 'Feb', users: 60 },
    { month: 'Mar', users: 80 },
    { month: 'Apr', users: 100 },
    { month: 'May', users: 120 },
    { month: 'Jun', users: 140 },
    { month: 'Jul', users: 160 },
    { month: 'Aug', users: 180 },
    { month: 'Sep', users: 200 },
    { month: 'Oct', users: 220 },
    { month: 'Nov', users: 240 },
    { month: 'Dec', users: 251 },
];

const UserGrowthChart = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">User Growth</h2>
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
                <BarChart data={userGrowthData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;
