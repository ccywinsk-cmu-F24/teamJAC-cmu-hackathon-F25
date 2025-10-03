export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900">
      <main className="w-full max-w-md flex flex-col items-center gap-6 rounded-2xl border border-white/20 bg-white/60 dark:bg-black/30 backdrop-blur-xl shadow-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-emerald-600 dark:from-indigo-300 dark:to-emerald-300 bg-clip-text text-transparent">
          InvestED
        </h1>
        <p className="text-center text-sm text-gray-700 dark:text-gray-200">
          Enter your email to get started.
        </p>
        <form className="w-full flex flex-col gap-4" action="#" method="post">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded-md border border-white/30 bg-white/80 dark:bg-white/10 px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-indigo-500/70"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-4 py-2 font-medium hover:brightness-110 transition"
          >
            Sign up
          </button>
        </form>
        <p className="text-xs text-center text-gray-700/80 dark:text-gray-300/80">
          By continuing you agree to our terms and privacy policy.
        </p>
      </main>
    </div>
  );
}
