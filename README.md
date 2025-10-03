# InvestED: Financial Literacy for Everyone 🚀

**Financial freedom shouldn't require a finance degree.** InvestED is an interactive, bite-sized learning platform designed to empower everyone with the financial knowledge they need to build a better future.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation & Running

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000 in your browser
```

The app will automatically reload when you make changes.

### Build for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

-----

### The Problem 😟

Financial illiteracy costs Americans an estimated **$415 billion** each year. A staggering **73% of people** live paycheck to paycheck, often trapped in cycles of debt and financial stress.

Traditional financial education is often inaccessible, intimidating, or designed for those who are already wealthy. This leaves behind huge segments of our communities, including first-generation college students, gig workers, immigrants, and the formerly incarcerated. Information is not enough; people need to practice making decisions in a safe environment.

### Our Solution: Learn by Doing ✨

InvestEd closes this gap by providing an **empathy-driven, actionable, and accessible** platform. We break down complex financial topics into 5-minute daily lessons and simulations. Instead of just reading about money, our users practice making real-world financial decisions and see the immediate impact of their choices.

-----

### Core Features 🎯

* **Personalized Financial Health Check-In:** A quick, 5-question onboarding quiz assesses your current financial situation, concerns, and goals. Based on your answers, InvestEd creates a personalized learning path just for you.

* **Bite-Sized Mini-Lessons:** Forget dry textbooks. Our lessons are engaging, 2-minute reads focused on high-impact topics that matter most.

    * **Emergency Funds:** "Why $500 can change your life"
    * **Credit Card Debt:** "The real cost of minimum payments"
    * **Budgeting Basics:** "The 50/30/20 rule explained simply"

* **Interactive Decision Simulator:** This is where theory meets practice. Navigate real-world financial scenarios with branching outcomes.

    * **Scenario:** *"An unexpected $800 car repair comes up. You have $500 in savings. What's your move?"*
    * **Choices:** Use a credit card (we'll show you the interest you'd pay), negotiate a payment plan, or borrow from family (we'll discuss the non-financial pros and cons).
    * **Feedback:** See how your choice impacts your financial health score in real-time.

* **Simple Progress Tracker:** A clean dashboard visualizes your journey. See how many concepts you've mastered and which scenarios you've completed. Get recommendations for your next lesson and share your achievements with pride\!

* **Equity-Focused Resource Hub:** We connect users with a curated list of free, high-quality tools and services, with a special focus on resources for underserved communities, such as Spanish speakers, the formerly incarcerated, and new immigrants.

-----

### Demo 🎬

Check out our 3-minute demo flow that takes a user from financial uncertainty to empowered decision-making\!

**(Link to a live demo or video walkthrough would go here)**

1.  **Hook (15s):** We start with the problem: financial stress is universal.
2.  **Onboarding (30s):** A user completes the quick check-in and receives a personalized starting point: "Let's start with emergency funds."
3.  **Learn & Simulate (90s):** The user reads a quick lesson, then faces an interactive scenario about a broken phone. They see the immediate financial consequence of choosing to use savings versus a high-interest credit card.
4.  **Impact (45s):** We show the progress tracker and highlight our equity-focused mission. We end with our core belief: **Financial freedom is for everyone.**

-----

### Tech Stack 🛠️

For this hackathon prototype, we prioritized speed, interactivity, and a mobile-first experience.

* **Frontend:** **React** with **Tailwind CSS** for rapid, clean UI development.
* **Backend:** None\! We used **`localStorage`** to store user progress and quiz results directly in the browser, making the app fast and serverless.
* **Visualizations:** **Chart.js** for simple, effective charts showing things like debt payoff timelines.
* **Content:** Scenarios and lessons are managed through static **JSON files** for easy updates without needing a complex CMS.

-----

### What Makes InvestEd a Stronger Solution? ⚖️

* **Solves a Real, Urgent Problem:** We are tackling a multi-billion dollar problem that affects the well-being of millions.
* **Equity-Focused by Design:** We actively build for and center the needs of communities left out of the financial conversation.
* **Actionable, Not Just Informational:** Users don't just consume content; they build decision-making muscle.
* **Measurable Impact:** Success is clear: users master concepts and learn to make better financial choices.
* **Infinitely Scalable:** Our modular structure makes it easy to add countless new lessons, scenarios, languages, and culturally-relevant resources.
