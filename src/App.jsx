import { useMemo, useState } from "react";
import { Card } from "./components/Card";
import { ChartCard } from "./components/ChartCard";
import { ExpenseForm } from "./components/ExpenseForm";
import { Navbar } from "./components/Navbar";

function App() {
  const [transactions, setTransactions] = useState([]);

  function addTransaction(transaction) {
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      { ...transaction, id: crypto.randomUUID() },
    ]);
  }

  const totals = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((totalsByCategory, transaction) => {
        totalsByCategory[transaction.category] =
          (totalsByCategory[transaction.category] || 0) + transaction.amount;
        return totalsByCategory;
      }, {});

    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 flex flex-col gap-1 sm:mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Personal finance
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your money, in view.
          </h1>
          <p className="max-w-xl text-sm text-stone-600 sm:text-base">
            Add income and expenses to see your spending picture take shape.
          </p>
        </header>

        <section aria-label="Financial summary" className="grid gap-3 sm:grid-cols-3">
          <Card type="Income" balance={totals.income} tone="green" />
          <Card type="Expenses" balance={totals.expenses} tone="red" />
          <Card type="Balance" balance={totals.balance} tone="blue" />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
          <ExpenseForm onAddTransaction={addTransaction} />
          <ChartCard categoryData={categoryData} />
        </section>
      </main>
    </div>
  );
}


export default App;
