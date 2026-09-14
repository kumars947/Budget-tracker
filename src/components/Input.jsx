
export function Input({ label, name, placeholder, type = "text", value, onChange, required }) {
    return (
        <div>
            <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-stone-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                min={type === "number" ? "0.01" : undefined}
                step={type === "number" ? "0.01" : undefined}
                className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
        </div>
    );
}
