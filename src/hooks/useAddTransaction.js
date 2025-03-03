import { useGetUserInfo } from "./useGetUserInfo";

const useAddTransaction = ({ setTransactions }) => {
  const { jwtToken } = useGetUserInfo();
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
    transactionDate,
  }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            description,
            transaction_amount: transactionAmount,
            transaction_type: transactionType,
            transaction_date: transactionDate,
          }),
        }
      );
      if (!response.ok) {
        alert("Failed to add transaction");
        return;
      }

      const newTransaction = await response.json();

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction.data,
      ]);
    } catch (error) {
      console.error("Error adding transaction", error);
    }
  };

  return { addTransaction };
};

export default useAddTransaction;
