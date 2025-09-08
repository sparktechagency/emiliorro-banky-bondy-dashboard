import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const bondData = [
    { name: '1', value: 1000 },
    { name: '2', value: 800 },
    { name: '3', value: 1200 },
    { name: '4', value: 200 },
    { name: '5', value: 2100 },
    { name: '6', value: 2000 },
    { name: '7', value: 1400 },
];

const BondOverview = () => {
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bond Overview</h2>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Total bond</p>
                    <p className="text-lg font-bold">10000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Completed bond</p>
                    <p className="text-lg font-bold">5000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Incomplete bond</p>
                    <p className="text-lg font-bold">10000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Ongoing bond</p>
                    <p className="text-lg font-bold">10000 <span className="text-sm text-green-500">+14%</span></p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bondData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="name" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BondOverview;