export default function Navbar() {
  return (
    <header className="nav">
      <div className="brand">
        <span className="brand-mark">₹</span>

        <span>
          Budget<span>Tracker</span>
        </span>
      </div>

      <div className="nav-right">
        <div className="nav-note">
          Personal finance, made simple
        </div>

        <a
          className="github-btn"
          href="https://github.com/kumars947/Budget-tracker.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  )
}
