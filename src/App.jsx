import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import DatePicker from "./components/DatePicker";
import Chatbot from "./components/Chatbot";
import AllTransactions from "./components/AllTransactions";
import BudgetBuddy from "./pages/budget buddy/BudgetBuddy";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/transaction" element={<AllTransactions />} />
          <Route path="/budget-buddy" element={<BudgetBuddy />} />
          <Route path="/date" element={<DatePicker />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
