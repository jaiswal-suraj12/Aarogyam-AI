import { useAppContext } from '../context/AppContext';

const CaloriesChart = () => {

    const { allActivityLogs, allFoodLogs } = useAppContext();

    const getData = () => {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const dailyFood = allFoodLogs.filter(log => log.createdAt?.split('T')[0] === dateString);
            const dailyActivity = allActivityLogs.filter(log => log.createdAt?.split('T')[0] === dateString);

            const intake = dailyFood.reduce((sum, item) => sum + item.calories, 0);
            const burn = dailyActivity.reduce((sum, item) => sum + (item.calories || 0), 0);

            data.push({
                name: dayName,
                Intake: intake,
                Burn: burn,
                date: dateString
            });
        }
        return data;
    };

    const data = getData();
    const maxValue = Math.max(
        1,
        ...data.map((item) => Math.max(item.Intake, item.Burn))
    );

    return (
        <div className="w-full h-[300px] mt-4">
            <div className="flex h-full items-end gap-3 border-b border-slate-200 px-2 pb-8 dark:border-slate-700">
                {data.map((item) => (
                    <div key={item.date} className="flex flex-1 flex-col items-center justify-end gap-2">
                        <div className="flex h-52 w-full items-end justify-center gap-1">
                            <div
                                className="w-4 rounded-t bg-emerald-500"
                                style={{ height: `${(item.Intake / maxValue) * 100}%` }}
                                title={`Intake: ${item.Intake} kcal`}
                            />
                            <div
                                className="w-4 rounded-t bg-orange-500"
                                style={{ height: `${(item.Burn / maxValue) * 100}%` }}
                                title={`Burn: ${item.Burn} kcal`}
                            />
                        </div>
                        <span className="text-xs text-slate-500">{item.name}</span>
                    </div>
                ))}
            </div>
            <div className="mt-3 flex justify-center gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-500" /> Intake</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-orange-500" /> Burn</span>
            </div>
        </div>
    );
};

export default CaloriesChart;
