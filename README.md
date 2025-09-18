# Linspo UI - Data Visualization Components

Linspo UI is an open-source, elegant web visualization component library aimed at making common chart types and data visualizations beautiful and easy to use on the web.

## Features


Repository: https://github.com/<your-username>/linspo-ui

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component showcase.

## Available Components

### Charts

- **LineChart** - Time series and trend visualization
- **BarChart** - Categorical data comparison
- **AreaChart** - Filled line charts for cumulative data
- **PieChart** - Part-to-whole relationships
- **ScatterPlot** - Correlation and distribution analysis

### KPI Components

- **MetricCards** - Key performance indicators with trend indicators
- **ProgressBars** - Goal tracking and completion status
- **Gauges** - Circular progress indicators
- **Sparklines** - Inline trend visualization

### Dashboard Components

- **Heatmap** - Matrix data visualization
- **TreeMap** - Hierarchical data representation
- **Funnel Chart** - Conversion process visualization
- **Radar Chart** - Multi-dimensional data comparison

## Tech Stack

- **React 19** - Component framework
- **Next.js 15** - Full-stack React framework
- **D3.js** - Data manipulation and custom visualizations
- **Recharts** - React chart library
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety and developer experience
- **Framer Motion** - Smooth animations

## Usage

```tsx
import { LineChart, MetricCards, BarChart } from "muse-ui";

const data = [
  { month: "Jan", revenue: 4000, users: 240 },
  { month: "Feb", revenue: 3000, users: 139 },
  { month: "Mar", revenue: 2000, users: 980 },
];

export default function Dashboard() {
  return (
    <div>
      <MetricCards
        metrics={[
          { label: "Revenue", value: "$45K", change: "+12%" },
          { label: "Users", value: "1.2K", change: "+5%" },
        ]}
      />
      <LineChart data={data} xKey="month" yKey="revenue" />
      <BarChart data={data} xKey="month" yKey="users" />
    </div>
  );
}
```

## Contributing

We welcome contributions! If you'd like to contribute, please open issues or pull requests on GitHub: `https://github.com/<your-username>/linspo-ui`.

Guidelines:
- Fork the repo and create a feature branch.
- Keep changes focused and well-documented.
- Add tests for new components when applicable.

## License

MIT License - see LICENSE file for details.
