export default function Page2({
  transactions = []
}) {
  return (
    <div className="page2">
      <h2>All transactions</h2>

      {transactions.length ? (
        <p>
          {transactions.length} transaction
          {transactions.length > 1 ? 's' : ''} recorded.
        </p>
      ) : (
        <p>Your transaction list is empty.</p>
      )}
    </div>
  )
}
