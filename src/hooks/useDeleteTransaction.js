import { useGetUserInfo } from "./useGetUserInfo";

const useDeleteTransaction = () => {
  const { jwtToken } = useGetUserInfo();

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete transaction");
      }

      const result = await response.json();
      return { success: true, message: result.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return { deleteTransaction };
};

export default useDeleteTransaction;
