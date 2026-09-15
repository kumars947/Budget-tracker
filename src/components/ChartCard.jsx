import Card from './Card'

export default function ChartCard({ data }) {
  const total = data.reduce(
    (sum, item) => sum + item.amount,
    0
  )

  if (!total) {
    return (
      <Card className="empty-card">
        <div className="empty-icon">◔</div>

        <h3>No expenses to chart yet</h3>

        <p>
          Add an expense above and your spending
          breakdown will appear here.
        </p>
      </Card>
    )
  }

  const colors = [
    '#d9543d',
    '#3f6f91',
    '#d5a24b',
    '#6d8f72',
    '#8d6b9f',
    '#5f777c'
  ]

  let start = 0
  const radius = 46
  const circumference = 2 * Math.PI * radius

  const slices = data.map((item, index) => {
    const length =
      (item.amount / total) * circumference

    const slice = {
      ...item,
      color: colors[index % colors.length],
      dash: `${length} ${circumference - length}`,
      offset: -start
    }

    start += length

    return slice
  })

  return (
    <Card className="chart-card">
      <div className="section-head">
        <div>
          <p className="eyebrow">SPENDING</p>
          <h2>Where your money goes</h2>
        </div>

        <span className="muted">
          US${total.toFixed(2)}
        </span>
      </div>

      <div className="chart-wrap">
        <svg
          viewBox="0 0 110 110"
          className="donut"
        >
          <circle
            cx="55"
            cy="55"
            r={radius}
            fill="none"
            stroke="#eeeae4"
            strokeWidth="12"
          />

          <g transform="rotate(-90 55 55)">
            {slices.map(item => (
              <circle
                key={item.category}
                cx="55"
                cy="55"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={item.dash}
                strokeDashoffset={item.offset}
              />
            ))}
          </g>

          <text
            x="55"
            y="53"
            textAnchor="middle"
            className="donut-total"
          >
            ${total.toFixed(0)}
          </text>

          <text
            x="55"
            y="64"
            textAnchor="middle"
            className="donut-label"
          >
            spent
          </text>
        </svg>

        <div className="legend">
          {slices.map(item => (
            <div
              className="legend-row"
              key={item.category}
            >
              <span
                className="dot"
                style={{
                  background: item.color
                }}
              />

              <span>{item.category}</span>

              <b>
                {(
                  (item.amount / total) *
                  100
                ).toFixed(0)}
                %
              </b>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
