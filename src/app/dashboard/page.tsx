"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TABS = ["Overview", "Mini-Lessons", "Decision Simulator", "Progress Tracker", "Resource Hub"] as const;
type Tab = typeof TABS[number];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Overview");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab === 'mini-lessons') {
            setActiveTab('Mini-Lessons');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900">
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="w-64 border-r border-white/20 bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 dark:from-indigo-900 dark:via-sky-900 dark:to-emerald-900 backdrop-blur-xl shadow-xl p-4 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-600 to-emerald-500" />
                        <div>
                            <div className="text-sm text-white/90">Welcome back</div>
                            <div className="text-base font-semibold text-white">
                                InvestED
                            </div>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
                        {TABS.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={
                                        "w-full text-left rounded-md px-3 py-2 text-sm transition border " +
                                        (isActive
                                            ? "bg-white/20 text-white border-white/30"
                                            : "bg-white/10 text-white/90 hover:bg-white/20 border-white/20")
                                    }
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto p-6 bg-amber-50">
                    <div className="rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl shadow-xl p-4 sm:p-6">
                        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-700 to-emerald-600 dark:from-indigo-300 dark:to-emerald-300 bg-clip-text text-transparent">
                                {activeTab}
                            </h1>
                            
                        </header>

                        <section className="grid gap-4 sm:gap-6">
                            {activeTab === "Overview" && (
                                <div className="space-y-6">
                                    <OverviewDashboard />
                                </div>
                            )}

                             {activeTab === "Mini-Lessons" && (
                                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                     <LessonCard
                                         title="Why $500 can change your life"
                                         description="Learn how a small emergency fund can prevent financial disasters and provide peace of mind."
                                         duration="2 min read"
                                         lessonId="emergency-fund"
                                         onReadMore={() => router.push('/dashboard/lesson/emergency-fund')}
                                     />
                                     <LessonCard
                                         title="The real cost of minimum payments"
                                         description="Discover how minimum credit card payments can trap you in debt for years."
                                         duration="2 min read"
                                         lessonId="credit-card-debt"
                                         onReadMore={() => router.push('/dashboard/lesson/credit-card-debt')}
                                     />
                                     <LessonCard
                                         title="50/30/20 rule explained simply"
                                         description="Master the simple budgeting framework that works for most people."
                                         duration="2 min read"
                                         lessonId="budgeting-basics"
                                         onReadMore={() => router.push('/dashboard/lesson/budgeting-basics')}
                                     />
                                 </div>
                             )}

                            {activeTab === "Decision Simulator" && (
                                <div className="grid grid-cols-1 gap-4">
                                </div>
                            )}

                            {activeTab === "Progress Tracker" && (
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4">
                                       
                                    </div>
                                </div>
                            )}

                            {activeTab === "Resource Hub" && (
                                <div className="grid grid-cols-1 gap-4">
                                    
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Card({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">{title}</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
            {subtitle ? (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subtitle}</div>
            ) : null}
        </div>
    );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
    return (
        <div className="overflow-auto rounded-xl border border-white/20">
            <table className="min-w-full text-sm">
                <thead className="bg-white/70 dark:bg-white/10">
                    <tr>
                        {headers.map((h) => (
                            <th key={h} className="text-left font-medium text-gray-800 dark:text-gray-200 px-3 py-2">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white/60 dark:bg-black/20">
                    {rows.map((row, idx) => (
                        <tr key={idx} className="border-t border-white/20">
                            {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2 text-gray-800 dark:text-gray-200">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ReportCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{title}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{description}</div>
            <div className="mt-3">
                <button className="rounded-md bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-3 py-2 text-sm font-medium hover:brightness-110 transition">
                    View report
                </button>
            </div>
        </div>
    );
}

function Toggle() {
    const [checked, setChecked] = useState(false);
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => setChecked((v) => !v)}
            className={
                "relative inline-flex h-6 w-11 items-center rounded-full transition " +
                (checked ? "bg-gradient-to-r from-indigo-600 to-emerald-500" : "bg-white/70 dark:bg-white/10 border border-white/20")
            }
        >
            <span
                className={
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition " +
                    (checked ? "translate-x-5" : "translate-x-1")
                }
            />
        </button>
    );
}

function LessonCard({ 
    title, 
    description, 
    duration, 
    lessonId,
    onReadMore
}: {
    title: string;
    description: string;
    duration: string;
    lessonId: string;
    onReadMore: () => void;
}) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <span className="text-xs bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-2 py-1 rounded-full text-center">
                    {duration}
                </span>
            </div>
            
            <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
                <button
                    onClick={onReadMore}
                    className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:brightness-110 transition"
                >
                    Read More
                </button>
            </div>
        </div>
    );
}

function OverviewDashboard() {
    const financialData = {
        totalAssets: 45680,
        totalDebt: 12450,
        netWorth: 33230,
        monthlyIncome: 5200,
        monthlyExpenses: 3800,
        savingsRate: 27,
        emergencyFund: 8500,
        retirementSavings: 18750,
        creditScore: 742
    };

    const debtBreakdown = [
        { name: "Credit Cards", amount: 3200, interest: 18.5, color: "bg-red-500" },
        { name: "Student Loan", amount: 6800, interest: 4.2, color: "bg-blue-500" },
        { name: "Car Loan", amount: 2450, interest: 6.8, color: "bg-green-500" }
    ];

    const savingsProgress = [
        { goal: "Emergency Fund", current: 8500, target: 12000, progress: 71 },
        { goal: "Vacation", current: 1200, target: 3000, progress: 40 },
        { goal: "New Car", current: 3200, target: 15000, progress: 21 }
    ];

    return (
        <div className="space-y-6">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FinancialCard
                    title="Net Worth"
                    value={`$${financialData.netWorth.toLocaleString()}`}
                    change="+$2,340"
                    changeType="positive"
                    icon="💰"
                />
                <FinancialCard
                    title="Monthly Savings"
                    value={`$${(financialData.monthlyIncome - financialData.monthlyExpenses).toLocaleString()}`}
                    change="+$200"
                    changeType="positive"
                    icon="📈"
                />
                <FinancialCard
                    title="Credit Score"
                    value={financialData.creditScore.toString()}
                    change="+12"
                    changeType="positive"
                    icon="🏆"
                />
                <FinancialCard
                    title="Savings Rate"
                    value={`${financialData.savingsRate}%`}
                    change="+3%"
                    changeType="positive"
                    icon="🎯"
                />
            </div>

            {/* Charts and Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Debt Breakdown */}
                <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Debt Breakdown</h3>
                    <div className="space-y-4">
                        {debtBreakdown.map((debt, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{debt.name}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">${debt.amount.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${debt.color}`}
                                        style={{ width: `${(debt.amount / 6800) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>Interest: {debt.interest}%</span>
                                    <span>Monthly: ${Math.round(debt.amount * debt.interest / 100 / 12)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Savings Goals */}
                <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Savings Goals</h3>
                    <div className="space-y-4">
                        {savingsProgress.map((goal, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{goal.goal}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{goal.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                    <div 
                                        className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                                        style={{ width: `${goal.progress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>${goal.current.toLocaleString()}</span>
                                    <span>${goal.target.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Financial Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-white/20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">💡 Smart Move</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Your credit score improved by 12 points this month! Consider applying for a balance transfer card to consolidate your high-interest credit card debt.
                    </p>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        Potential savings: $180/month
                    </div>
                </div>

                <div className="rounded-xl border border-white/20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Next Goal</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        You're 71% to your emergency fund goal! At your current savings rate, you'll reach $12,000 in 3 months.
                    </p>
                    <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        Keep up the great work! 🚀
                    </div>
                </div>
            </div>
        </div>
    );
}

function FinancialCard({ title, value, change, changeType, icon }: {
    title: string;
    value: string;
    change: string;
    changeType: "positive" | "negative";
    icon: string;
}) {
    return (
        <div className="rounded-xl border border-white/20 bg-white/70 dark:bg-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-2xl">{icon}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                    changeType === "positive" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                    {change}
                </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
        </div>
    );
}


