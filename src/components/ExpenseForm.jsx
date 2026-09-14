import { Button } from "./Button";
import { Input } from "./Input";

import { useState } from "react";

export function ExpenseForm({ onAddTransaction }) {
    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const numericAmount = Number(amount);
        const trimmedCategory = category.trim();

        if (!numericAmount || numericAmount <= 0 || !trimmedCategory) return;

        onAddTransaction({
            type,
            amount: numericAmount,
            category: trimmedCategory,
            note: note.trim(),
        });
        setAmount("");
        setCategory("");
        setNote("");
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
                <p className="text-lg font-bold">Add a transaction</p>
                <p className="mt-1 text-sm text-stone-500">Keep your latest money moves in one place.</p>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-stone-100 p-1">
                {["expense", "income"].map((transactionType) => (
                    <button
                        key={transactionType}
                        type="button"
                        onClick={() => setType(transactionType)}
                        className={`rounded-lg px-3 py-2.5 text-sm font-semibold capitalize transition ${
                            type === transactionType
                                ? "bg-stone-950 text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-950"
                        }`}
                    >
                        {transactionType}
                    </button>
                ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Amount" name="amount" type="number" placeholder="0.00" value={amount} onChange={(event) => setAmount(event.target.value)} required />
                <Input label="Category" name="category" placeholder="Food" value={category} onChange={(event) => setCategory(event.target.value)} required />
            </div>
            <div className="mt-4">
                <Input label="Note (optional)" name="note" placeholder="Write something..." value={note} onChange={(event) => setNote(event.target.value)} />
            </div>
            <div className="mt-6">
                <Button label="Add transaction" />
            </div>
        </form>
    );
}
