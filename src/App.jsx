import { useEffect, useMemo, useState } from "react";
import "./App.css";

const categories = {
  Food: "🍔",
  Transport: "🚕",
  Shopping: "🛍️",
  Bills: "💡",
  Entertainment: "🎬",
  Health: "💊",
  Salary: "💼",
  Freelance: "💻",
  Other: "📦",
};

const initialTransactions = [
  {
    id: 1,
    type: "income",
    amount: 5000,
    category: "Salary",
    note: "Monthly salary",
    date: "2026-09-01",
  },
  {
    id: 2,
    type: "expense",
    amount: 420,
    category: "Food",
    note: "Groceries",
    date: "2026-09-03",
  },
  {
    id: 3,
    type: "expense",
    amount: 180,
    category: "Transport",
    note: "Taxi and fuel",
    date: "2026-09-05",
  },
  {
    id: 4,
    type: "expense",
    amount: 350,
    category: "Bills",
    note: "Internet bill",
    date: "2026-09-08",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("expense");

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState(3000);

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("budgetTransactions");

    return saved
      ? JSON.parse(saved)
      : initialTransactions;
  });

  useEffect(() => {
    localStorage.setItem(
      "budgetTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

    const expenses = transactions
      .filter((item) => item.type === "expense")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenseItems = transactions.filter(
      (item) => item.type === "expense"
    );

    const grouped = {};

    expenseItems.forEach((item) => {
      grouped[item.category] =
        (grouped[item.category] || 0) +
        Number(item.amount);
    });

    return Object.entries(grouped)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: activeTab,
      amount: Number(amount),
      category,
      note: note || "No description",
      date: new Date()
        .toISOString()
        .split("T")[0],
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    setAmount("");
    setNote("");
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const filteredTransactions = transactions.filter(
    (item) => {
      const query = search.toLowerCase();

      return (
        item.category
          .toLowerCase()
          .includes(query) ||
        item.note
          .toLowerCase()
          .includes(query)
      );
    }
  );

  const expensePercentage =
    budget > 0
      ? Math.min(
          (totals.expenses / budget) * 100,
          100
        )
      : 0;

  const maxCategoryValue =
    categoryData.length > 0
      ? Math.max(
          ...categoryData.map(
            (item) => item.value
          )
        )
      : 1;

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">
            B
          </div>

          <span>Budgetly</span>
        </div>

        <nav className="nav-menu">

          <button className="nav-item active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="nav-item">
            <span>◫</span>
            Transactions
          </button>

          <button className="nav-item">
            <span>▥</span>
            Analytics
          </button>

          <button className="nav-item">
            <span>◎</span>
            Budget
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="premium-card">
            <span>✦</span>

            <h4>
              Manage smarter
            </h4>

            <p>
              Take full control of your
              money.
            </p>
          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* TOP BAR */}

        <header className="topbar">

          <div>
            <p className="welcome">
              Welcome back 👋
            </p>

            <h1>
              Financial Overview
            </h1>
          </div>

          <div className="top-actions">

            {/* GITHUB BUTTON */}

            <a
              className="github-button"
              href="https://github.com/kumars947/Budget-tracker"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub repository"
            >

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.043-1.61-4.043-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.243 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.103.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.216.696.825.578C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
              </svg>

              <span>
                GitHub
              </span>

            </a>

            {/* DARK MODE */}

            <button
              className="theme-button"
              onClick={() =>
                setDarkMode(!darkMode)
              }
              aria-label="Toggle theme"
            >
              {darkMode
                ? "☀️"
                : "🌙"}
            </button>

            {/* PROFILE */}

            <div className="avatar">
              K
            </div>

          </div>

        </header>

        {/* SUMMARY CARDS */}

        <section className="summary-grid">

          <div className="summary-card income-card">

            <div className="summary-top">

              <div>
                <p>Total Income</p>

                <h2>
                  $
                  {totals.income.toLocaleString()}
                </h2>
              </div>

              <div className="card-icon income-icon">
                ↗
              </div>

            </div>

            <span className="trend positive">
              +12.5% from last month
            </span>

          </div>

          <div className="summary-card expense-card">

            <div className="summary-top">

              <div>
                <p>Total Expenses</p>

                <h2>
                  $
                  {totals.expenses.toLocaleString()}
                </h2>
              </div>

              <div className="card-icon expense-icon">
                ↘
              </div>

            </div>

            <span className="trend negative">
              Monthly spending
            </span>

          </div>

          <div className="summary-card balance-card">

            <div className="summary-top">

              <div>
                <p>Available Balance</p>

                <h2>
                  $
                  {totals.balance.toLocaleString()}
                </h2>
              </div>

              <div className="card-icon balance-icon">
                ◈
              </div>

            </div>

            <span className="trend positive">
              Your finances look good
            </span>

          </div>

        </section>

        {/* ANALYTICS + BUDGET */}

        <section className="dashboard-grid">

          {/* CHART */}

          <div className="panel chart-panel">

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  ANALYTICS
                </p>

                <h3>
                  Spending by category
                </h3>

              </div>

              <span className="month-badge">
                This month
              </span>

            </div>

            {categoryData.length === 0 ? (

              <div className="empty-chart">

                <div className="empty-icon">
                  📊
                </div>

                <p>
                  No expenses yet
                </p>

                <span>
                  Add an expense to see
                  your analytics.
                </span>

              </div>

            ) : (

              <div className="chart">

                {categoryData.map(
                  (item) => (

                    <div
                      className="chart-row"
                      key={item.name}
                    >

                      <div className="chart-label">

                        <span>
                          {categories[
                            item.name
                          ] || "📦"}
                        </span>

                        <span>
                          {item.name}
                        </span>

                      </div>

                      <div className="bar-container">

                        <div
                          className="bar"
                          style={{
                            width: `${
                              (item.value /
                                maxCategoryValue) *
                              100
                            }%`,
                          }}
                        />

                      </div>

                      <strong>
                        ${item.value}
                      </strong>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* BUDGET */}

          <div className="panel budget-panel">

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  MONTHLY BUDGET
                </p>

                <h3>
                  Budget status
                </h3>

              </div>

            </div>

            <div
              className="budget-circle"
              style={{
                background: `conic-gradient(
                  var(--primary)
                  ${
                    expensePercentage * 3.6
                  }deg,
                  var(--panel-soft)
                  0deg
                )`,
              }}
            >

              <div className="circle-inner">

                <strong>
                  {Math.round(
                    expensePercentage
                  )}
                  %
                </strong>

                <span>
                  used
                </span>

              </div>

            </div>

            <div className="budget-info">

              <div>
                <span>
                  Spent
                </span>

                <strong>
                  $
                  {totals.expenses.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>
                  Budget
                </span>

                <strong>
                  $
                  {Number(
                    budget
                  ).toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="progress-track">

              <div
                className="progress-bar"
                style={{
                  width: `${expensePercentage}%`,
                }}
              />

            </div>

            <div className="budget-input">

              <label>
                Set monthly budget
              </label>

              <input
                type="number"
                value={budget}
                onChange={(e) =>
                  setBudget(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </div>

          </div>

        </section>

        {/* FORM + TRANSACTIONS */}

        <section className="bottom-grid">

          {/* ADD TRANSACTION */}

          <div className="panel form-panel">

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  NEW TRANSACTION
                </p>

                <h3>
                  Add transaction
                </h3>

              </div>

            </div>

            <div className="tabs">

              <button
                className={
                  activeTab === "expense"
                    ? "tab active-expense"
                    : "tab"
                }
                onClick={() => {
                  setActiveTab(
                    "expense"
                  );

                  setCategory(
                    "Food"
                  );
                }}
              >
                Expense
              </button>

              <button
                className={
                  activeTab === "income"
                    ? "tab active-income"
                    : "tab"
                }
                onClick={() => {
                  setActiveTab(
                    "income"
                  );

                  setCategory(
                    "Salary"
                  );
                }}
              >
                Income
              </button>

            </div>

            <form
              onSubmit={
                addTransaction
              }
            >

              <div className="form-row">

                <div className="input-group">

                  <label>
                    Amount
                  </label>

                  <div className="amount-input">

                    <span>
                      $
                    </span>

                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) =>
                        setAmount(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

                <div className="input-group">

                  <label>
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                  >

                    {activeTab ===
                    "expense" ? (
                      <>
                        <option>
                          Food
                        </option>

                        <option>
                          Transport
                        </option>

                        <option>
                          Shopping
                        </option>

                        <option>
                          Bills
                        </option>

                        <option>
                          Entertainment
                        </option>

                        <option>
                          Health
                        </option>

                        <option>
                          Other
                        </option>
                      </>
                    ) : (
                      <>
                        <option>
                          Salary
                        </option>

                        <option>
                          Freelance
                        </option>

                        <option>
                          Other
                        </option>
                      </>
                    )}

                  </select>

                </div>

              </div>

              <div className="input-group">

                <label>
                  Description
                </label>

                <input
                  type="text"
                  placeholder="What was this transaction for?"
                  value={note}
                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                />

              </div>

              <button
                className="add-button"
                type="submit"
              >

                <span>
                  ＋
                </span>

                Add{" "}
                {activeTab ===
                "income"
                  ? "income"
                  : "expense"}

              </button>

            </form>

          </div>

          {/* RECENT TRANSACTIONS */}

          <div className="panel transactions-panel">

            <div className="panel-header transaction-header">

              <div>

                <p className="panel-label">
                  ACTIVITY
                </p>

                <h3>
                  Recent transactions
                </h3>

              </div>

              <input
                className="search"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="transactions">

              {filteredTransactions.length ===
              0 ? (

                <div className="no-transactions">
                  No transactions
                  found.
                </div>

              ) : (

                filteredTransactions
                  .slice(0, 6)
                  .map((item) => (

                    <div
                      className="transaction"
                      key={item.id}
                    >

                      <div
                        className={`transaction-icon ${
                          item.type
                        }`}
                      >
                        {categories[
                          item.category
                        ] || "📦"}
                      </div>

                      <div className="transaction-details">

                        <strong>
                          {item.note}
                        </strong>

                        <span>
                          {item.category}
                          {" • "}
                          {item.date}
                        </span>

                      </div>

                      <div className="transaction-right">

                        <strong
                          className={
                            item.type ===
                            "income"
           
