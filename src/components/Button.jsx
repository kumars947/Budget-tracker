
export function Button({ label }) {
    return (
        <button
            type="submit"
            className="w-full rounded-lg bg-stone-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        >
            {label}
        </button>
    );
}
