import { useState, useEffect } from "react";
import { useGetUserInfo } from "./useGetUserInfo";

const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const { isAuth, jwtToken } = useGetUserInfo();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionType, setTransactionType] = useState("");

  const fetchTransactions = async () => {
    try {
      if (!isAuth) {
        console.error("No token found");
        return;
      }

      let queryParams = "";
      if (startDate || endDate) {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (transactionType) params.append("transactionType", transactionType);
        queryParams = `?${params.toString()}`;
        // console.log("Inside useGetTransaction.js Hook Start Date:", startDate);
        // console.log("Inside useGetTransaction.js Hook End Date:", endDate);
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setTransactions(result.data);
      } else {
        console.error("Error fetching transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const refreshTransactions = async () => {
    await fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, [isAuth, jwtToken]);

  useEffect(() => {
    const calculateTotals = () => {
      const income = transactions
        .filter((t) => t.transaction_type === "income")
        .reduce((sum, t) => sum + parseFloat(t.transaction_amount || 0), 0);
      const expense = transactions
        .filter((t) => t.transaction_type === "expense")
        .reduce((sum, t) => sum + parseFloat(t.transaction_amount || 0), 0);

      setTransactionTotals({
        balance: income - expense,
        income,
        expense,
      });
    };

    calculateTotals();
  }, [transactions]);

  return {
    transactions,
    transactionTotals,
    setTransactions,
    refreshTransactions,
    setStartDate,
    setEndDate,
    setTransactionType,
  };
};

export default useGetTransaction;
