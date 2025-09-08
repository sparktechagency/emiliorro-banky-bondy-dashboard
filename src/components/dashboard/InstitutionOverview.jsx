import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const institutionData = [
    { name: '1', total: 2400, perUser: 1500 },
    { name: '2', total: 2200, perUser: 1500 },
    { name: '3', total: 2000, perUser: 1800 },
    { name: '4', total: 2600, perUser: 1000 },
    { name: '5', total: 2000, perUser: 2200 },
    { name: '6', total: 4800, perUser: 2400 },
    { name: '7', total: 4000, perUser: 2600 },
];

const InstitutionOverview = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Institution Overview</h2>
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
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Total institution</p>
                    <p className="text-lg font-bold">10000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">User per institution</p>
                    <p className="text-lg font-bold">5000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={institutionData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="name" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    <Line type="monotone" dataKey="perUser" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default InstitutionOverview;