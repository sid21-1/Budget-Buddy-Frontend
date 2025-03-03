import React from "react";
import useGetTransaction from "../../hooks/useGetTransaction";
import IncomeExpenseForm from "../../components/IncomeExpenseForm";
import Transactions from "../../components/Transactions";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Chart from "../../components/Chart";

const BudgetBuddy = () => {
  const { transactions, transactionTotals, setTransactions } =
    useGetTransaction();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="p-3 w-full h-screen main-div   rounded-tl-lg rounded-bl-lg font-rubik">
          <SidebarTrigger />
          <div className="grid grid-cols-1 lg:grid-cols-[30%_68%] xl:grid-cols-[30%_68.5%] gap-4 mb-4">
            <IncomeExpenseForm
              setTransactions={setTransactions}
              transactionTotals={transactionTotals}
            />

            <Transactions
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
          <Chart transactions={transactions} />
        </div>
      </SidebarProvider>
    </>
  );
};

export default BudgetBuddy;
