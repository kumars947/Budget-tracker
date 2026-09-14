
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const categoryColors = ["#047857", "#0f766e", "#0369a1", "#b45309", "#be123c"];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function ChartCard({ categoryData }) {
  return (
    <section className="min-h-[20rem] rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-3">
        <p className="text-lg font-bold">Spending by category</p>
        <p className="mt-1 text-sm text-stone-500">Your expense breakdown at a glance.</p>
      </div>
      {categoryData.length === 0 ? (
        <div className="flex min-h-56 items-center justify-center rounded-xl bg-stone-50 px-6 text-center text-sm text-stone-500">
          No expenses to chart yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
              {categoryData.map((entry, index) => (
                <Cell key={entry.name} fill={categoryColors[index % categoryColors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => currency.format(value)} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
