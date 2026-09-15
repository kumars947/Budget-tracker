import { useState } from 'react'
import Card from './Card'
import Button from './Button'
import Input from './Input'

const categories = [
  'Food',
  'Rent',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other'
]

export default function ExpenseForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [note, setNote] = useState('')

  function submit(e) {
    e.preventDefault()

    const value = Number(amount)

    if (!value) return

    onAdd({
      type,
      amount: value,
      category,
      note
    })

    setAmount('')
    setNote('')
  }

  return (
    <Card className="form-card">
      <div className="tabs">
        <button
          type="button"
          className={type === 'expense' ? 'active expense' : ''}
          onClick={() => setType('expense')}
        >
          Expense
        </button>

        <button
          type="button"
          className={type === 'income' ? 'active income' : ''}
          onClick={() => setType('income')}
        >
          Income
        </button>
      </div>

      <form onSubmit={submit}>
        <div className="form-grid">
          <Input label="Amount">
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
          </Input>

          <Input label="Category">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(item => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Input>
        </div>

        <Input label="Note (optional)">
          <input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Groceries, rent, etc."
            maxLength="80"
          />
        </Input>

        <Button type="submit">
          Add {type}
        </Button>
      </form>
    </Card>
  )
}
