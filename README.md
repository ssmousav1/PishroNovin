# Pishronovin Chart Visualization

A React-based chart visualization application that dynamically renders single-series and multi-series charts using D3.js. Built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Dynamic Chart Detection**: Automatically detects chart type (single-series vs multi-series) from data format
- **D3.js Visualization**: Interactive line charts with proper scaling and axes
- **Multiple Chart Types**:
  - Single-series: One continuous line chart
  - Multi-series: Three colored lines (Blue, Green, Red) in the same chart
- **Null Value Handling**: Gracefully skips null data points without breaking chart continuity
- **Responsive Design**: Clean UI with Tailwind CSS styling

## Project Structure

```
chart-app/
├── src/
│   ├── components/
│   │   └── Chart.tsx          # Reusable chart component with D3.js integration
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/
│   └── data.json              # Chart data definitions
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## Data Format

The application loads chart data from `public/data.json` in the following format:

```json
[
  {
    "title": "Single Series Chart",
    "data": [[timestamp, value], [timestamp, null], [timestamp, value]]
  },
  {
    "title": "Multi Series Chart", 
    "data": [[timestamp, [value1, value2, value3]], [timestamp, [value1, value2, value3]]]
  }
]
```

- **Single-series**: `value` is a number or `null`
- **Multi-series**: `value` is an array of 3 numbers (can contain `null` values)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the chart-app directory:
   ```bash
   cd chart-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Technical Implementation

### Chart Component (`src/components/Chart.tsx`)

The `Chart` component handles:
- Automatic chart type detection by examining the first non-null data point
- D3.js SVG rendering with proper margins, scales, and axes
- Single-series: Renders one continuous line chart
- Multi-series: Renders three separate lines with distinct colors
- Null value handling: Filters out null points while maintaining chart continuity

### Key Features

- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Error Handling**: Graceful handling of loading states and data fetch errors
- **Performance**: Efficient D3.js rendering with proper cleanup on re-renders
- **Modularity**: Reusable chart component for scalable architecture

## Technologies Used

- **React 19** - UI framework
- **TypeScript** - Type safety and development experience
- **D3.js** - Data visualization and chart rendering
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality assurance

## Browser Support

This application supports all modern browsers that support ES2015+ and SVG.