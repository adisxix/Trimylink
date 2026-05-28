import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({stats = []}) {
  const cityCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }
    return acc;
  }, {});

  const cities = Object.entries(cityCount).map(([city, count]) => ({
    city,
    count,
  }));

  return (
    <div style={{width: "100%", height: 300}} className="w-full">
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities.slice(0, 5)}>
          <XAxis dataKey="city" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip 
            contentStyle={{background: "black", border: "1px solid #1e293b", borderRadius: "12px", color: "white"}}
            labelStyle={{color: "#00ffcc", fontWeight: "bold"}}
            itemStyle={{color: "white"}}
          />
          <Legend wrapperStyle={{fontSize: "12px", color: "#94a3b8"}} />
          <Line type="monotone" dataKey="count" stroke="#00ffcc" strokeWidth={2.5} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}