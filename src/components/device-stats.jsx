import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from "recharts";

const COLORS = ["#00ffcc", "#00d2ff", "#0d9488", "#10b981"];

export default function App({stats = []}) {
  const deviceCount = stats.reduce((acc, item) => {
    if (!acc[item.device]) {
      acc[item.device] = 0;
    }
    acc[item.device]++;
    return acc;
  }, {});

  const result = Object.keys(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));

  return (
    <div style={{width: "100%", height: 300}} className="w-full">
      <ResponsiveContainer>
        <PieChart width={700} height={400}>
          <Tooltip 
            contentStyle={{background: "black", border: "1px solid #1e293b", borderRadius: "12px", color: "white"}}
            itemStyle={{color: "#00ffcc"}}
          />
          <Pie
            data={result}
            labelLine={false}
            label={({device, percent}) =>
              `${device}: ${(percent * 100).toFixed(0)}%`
            }
            dataKey="count"
          >
            {result.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="black"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}