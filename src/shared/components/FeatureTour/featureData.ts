export interface Feature {
  id: string;
  title: string;
  description: string;
  reason: string;
  pros: string[];
  icon: string;
}

export const features: Feature[] = [
  {
    id: "1",
    title: "Component Optimization",
    description:
      "Split PokemonListPage from 597 lines into 5 smaller components (SearchBar, FilterPanel, PokemonGrid, LoadingOverlay, NoResults).",
    reason:
      "Large components become hard to maintain, test, and understand. Breaking them down follows the Single Responsibility Principle.",
    pros: [
      "Easier to test individual components",
      "Better code reusability across the app",
      "Improved readability and maintainability",
      "Faster debugging - issues isolated to specific components",
    ],
    icon: "🧩",
  },
  {
    id: "2",
    title: "Custom Hooks",
    description:
      "Extracted logic into useViewMode, useUrlFilters, and useSearchDebounce hooks to separate concerns.",
    reason:
      "Keeps components focused on UI while hooks handle business logic. Promotes code reuse and testability.",
    pros: [
      "Logic can be reused in multiple components",
      "Easier to unit test business logic separately",
      "Cleaner component code focused on rendering",
      "Better separation of concerns",
    ],
    icon: "🪝",
  },
  {
    id: "3",
    title: "URL State Sync",
    description:
      "Filter selections (types, generation, sort) are reflected in URL query parameters.",
    reason:
      "Enables shareable links, browser back/forward navigation, and better UX for bookmarking specific views.",
    pros: [
      "Users can share filtered views via URL",
      "Browser back/forward buttons work correctly",
      "Bookmarkable search results",
      "State persists on page refresh",
    ],
    icon: "🔗",
  },
  {
    id: "4",
    title: "LocalStorage Persistence",
    description: "View mode preference (grid/list) is saved to localStorage.",
    reason:
      "Remembers user preferences across sessions without requiring authentication or backend storage.",
    pros: [
      "Instant preference recall on return visits",
      "No backend storage needed",
      "Works offline",
      "Better user experience",
    ],
    icon: "💾",
  },
  {
    id: "5",
    title: "Debounced Search",
    description:
      "Search input waits 500ms after typing stops before making API calls.",
    reason:
      "Prevents excessive API requests while user is typing, reducing server load and improving performance.",
    pros: [
      "Reduces API calls by 80-90%",
      "Better server performance",
      "Lower bandwidth usage",
      "Smoother user experience",
    ],
    icon: "⚡",
  },
  {
    id: "6",
    title: "GraphQL Integration",
    description:
      "Using GraphQL with automatic TypeScript code generation from schema.",
    reason:
      "Fetch only needed data, strong typing, and better developer experience with auto-completion.",
    pros: [
      "Request only the data you need",
      "Auto-generated TypeScript types",
      "Single endpoint for all queries",
      "Better documentation via schema",
    ],
    icon: "📊",
  },
  {
    id: "7",
    title: "Redux State Management",
    description:
      "Centralized state with Redux Toolkit for predictable state updates.",
    reason:
      "Manages complex state across components, provides time-travel debugging, and ensures predictable state flow.",
    pros: [
      "Single source of truth for state",
      "Predictable state updates",
      "Excellent DevTools for debugging",
      "Easy to test state logic",
    ],

    icon: "🗄️",
  },
  {
    id: "8",
    title: "Responsive Design",
    description:
      "Mobile-first design with breakpoints for tablet and desktop using MUI Grid system.",
    reason:
      "Over 60% of web traffic is mobile. Responsive design ensures great UX on all devices.",
    pros: [
      "Works on all screen sizes",
      "Better mobile user experience",
      "Single codebase for all devices",
      "Improved SEO rankings",
    ],
    icon: "📱",
  },
  {
    id: "9",
    title: "Type Safety",
    description:
      "Full TypeScript with strict mode enabled for compile-time error detection.",
    reason:
      "Catches bugs during development, provides better IDE support, and serves as living documentation.",
    pros: [
      "Catch errors before runtime",
      "Better IDE auto-completion",
      "Self-documenting code",
      "Easier refactoring",
    ],
    icon: "🛡️",
  },
  {
    id: "10",
    title: "Material UI Theming",
    description:
      "Custom theme with sx prop styling pattern and consistent design tokens.",
    reason:
      "Provides professional UI components, consistent design language, and accessibility out of the box.",
    pros: [
      "Professional-looking components",
      "Built-in accessibility features",
      "Consistent design system",
      "Dark/light mode support",
    ],
    icon: "🎨",
  },
];
