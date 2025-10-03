"use client";

import { useState } from "react";

const TABS = ["Overview", "Mini-Lessons", "Decision Simulator", "Progress Tracker", "Resource Hub"] as const;
type Tab = typeof TABS[number];

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>("Overview");

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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                </div>
                            )}

                            {activeTab === "Mini-Lessons" && (
                                <div className="grid grid-cols-1 gap-4">
                                  
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


