
export function Navbar() {
    return (
        <nav className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="text-xl font-bold tracking-tight text-emerald-800 sm:text-2xl">BudgetTracker</div>
                <a
                    href="https://github.com/anandKumar0432/budget-tracker"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-stone-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                    GitHub
                </a>
            </div>
        </nav>
    );
}
