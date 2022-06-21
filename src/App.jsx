import "./App.css";
import AppRoutes from "./Routes";
import ErrorBoundary from "./Utils/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </div>
  );
}

export default App;
