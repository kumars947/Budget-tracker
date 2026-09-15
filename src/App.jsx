import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Card from './components/Card'
import ExpenseForm from './components/ExpenseForm'
import ChartCard from './components/ChartCard'
import Button from './components/Button'
import './App.css'

const KEY = 'budget-tracker-data'

function load() {
  try {
    return JSON.parse(
      localStorage.getItem(KEY)
    ) || []
  } catch {
    return []
  }
}

function money(value) {
  return `US$${value.toFixed(2)}`
}

export default function App() {
  const [transactions, setTransactions] =
    useState(load)

  const [filter, setFilter] =
    useState('all')

  function save(next) {
    setTransactions(next)

    localStorage.setItem(
      KEY,
      JSON.stringify(next)
    )
  }

  function add(transaction) {
    const item = {
      ...transaction,
      id: Date.now(),
      date: new Date().toLocaleDateString(
        undefined,
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      )
    }

    save([item, ...transactions])
  }

  function remove(id) {
    save(
      transactions.filter(
        item => item.id !== id
      )
    )
  }

  const income = transactions
    .filter(item => item.type === 'income')
    .reduce(
      (sum, item) => sum + item.amount,
      0
    )

  const expenses = transactions
    .filter(item => item.type === 'expense')
    .reduce(
      (sum, item) => sum + item.amount,
      0
    )

  const chart = useMemo(() => {
    const groups = {}

    transactions
      .filter(item => item.type === 'expense')
      .forEach(item => {
        groups[item.category] =
          (groups[item.category] || 0) +
          item.amount
      })

    return Object.entries(groups)
      .map(([category, amount]) => ({
        category,
        amount
      }))
      .sort(
        (a, b) => b.amount - a.amount
      )
  }, [transactions])

  const list = transactions.filter(item =>
    filter === 'all'
      ? true
      : item.type === filter
  )

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="hero">
          <div>
            <p className="eyebrow">
              PERSONAL FINANCE
            </p>

            <h1>Expense tracker</h1>

            <p>
              Log transactions and see where
              your money goes.
            </p>
          </div>

          <div className="date-pill">
            ● Live balance
          </div>
        </section>

        <section className="stats">
          <Card>
            <span>Income</span>
            <strong className="income">
              {money(income)}
            </strong>
          </Card>

          <Card>
            <span>Expenses</span>
            <strong className="expense">
              {money(expenses)}
            </strong>
          </Card>

          <Card>
            <span>Balance</span>
            <strong className="balance">
              {money(income - expenses)}
            </strong>
          </Card>
        </section>

        <ExpenseForm onAdd={add} />

        <ChartCard data={chart} />

        <Card className="transactions">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                ACTIVITY
              </p>

              <h2>
                Recent transactions
              </h2>
            </div>

            <div className="filters">
              <button
                className={
                  filter === 'all'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('all')
                }
              >
                All
              </button>

              <button
                className={
                  filter === 'income'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('income')
                }
              >
                Income
              </button>

              <button
                className={
                  filter === 'expense'
                    ? 'selected'
                    : ''
                }
                onClick={() =>
                  setFilter('expense')
                }
              >
                Expenses
              </button>
            </div>
          </div>

          {list.length ? (
            <div className="transaction-list">
              {list.map(item => (
                <div
                  className="transaction"
                  key={item.id}
                >
                  <div
                    className={`tx-icon ${item.type}`}
                  >
                    {item.type === 'income'
                      ? '↗'
                      : '↘'}
                  </div>

                  <div className="tx-main">
                    <b>
                      {item.note ||
                        item.category}
                    </b>

                    <small>
                      {item.category} ·{' '}
                      {item.date}
                    </small>
                  </div>

                  <strong
                    className={item.type}
                  >
                    {item.type === 'income'
                      ? '+'
                      : '−'}
                    {money(item.amount)}
                  </strong>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      remove(item.id)
                    }
                    aria-label="Delete transaction"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-list">
              <div className="empty-icon">
                ＋
              </div>

              <h3>
                No transactions yet
              </h3>

              <p>
                Add your first income or
                expense above.
              </p>
            </div>
          )}
        </Card>

        <footer>
          Built for simple, stress-free money
          tracking.
        </footer>
      </main>
    </>
  )
                  }
