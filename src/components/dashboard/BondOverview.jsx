import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BondOverview = ({bondOverviewData, onYearChange}) => {
    const { chartData = [], yearsDropdown = [], ...stats } = bondOverviewData || {};
    return (
        <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bond Overview</h2>
                <Select onValueChange={onYearChange} defaultValue={yearsDropdown?.[0]?.toString()}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {yearsDropdown?.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Total bond</p>
                    <p className="text-lg font-bold">{stats.total || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Completed bond</p>
                    <p className="text-lg font-bold">{stats.completed || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Incomplete bond</p>
                    <p className="text-lg font-bold">{stats.incomplete || 0}</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                    <p className="text-sm text-muted-foreground">Ongoing bond</p>
                    <p className="text-lg font-bold">{stats.ongoing || 0}</p>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid horizontal={false} vertical={false} strokeDasharray="1 1" />
                    <XAxis dataKey="month" axisLine={true} tickLine={false} />
                    <YAxis axisLine={true} tickLine={false}/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    <Line type="monotone" dataKey="completed" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="incomplete" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="ongoing" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BondOverview;