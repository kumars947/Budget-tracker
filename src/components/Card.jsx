
const toneStyles = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-950",
    red: "border-rose-200 bg-rose-50 text-rose-950",
    blue: "border-sky-200 bg-sky-50 text-sky-950",
};

const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
});

export function Card({ type, balance, tone }) {
    return (
        <article className={`rounded-2xl border p-5 ${toneStyles[tone]}`}>
            <p className="text-sm font-semibold opacity-75">{type}</p>
            <p className="mt-3 text-2xl font-bold tracking-tight">{currency.format(balance)}</p>
        </article>
    );
}
