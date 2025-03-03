import React, { useState } from "react";
import useGetTransaction from "../hooks/useGetTransaction";
import useAddTransaction from "../hooks/useAddTransaction";
import useDeleteTransaction from "../hooks/useDeleteTransaction";
import DatePicker from "../components/DatePicker";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
const AllTransactions = () => {
  const {
    transactions,
    refreshTransactions,
    setTransactions,
    setStartDate,
    setEndDate,
    setTransactionType,
  } = useGetTransaction();

  // const { addTransaction } = useAddTransaction({
  //   refreshTransactions,
  //   setTransactions,
  // });

  const { deleteTransaction } = useDeleteTransaction();

  const handleDelete = async (transactionId) => {
    const { success, message } = await deleteTransaction(transactionId);
    if (success) {
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.transaction_id !== transactionId
        )
      );
    } else {
      alert(`Error: ${message}`);
    }
  };

  const [dates, setDates] = useState({ date1: new Date(), date2: new Date() });

  const handleSetDate = (key, value) => {
    setDates((prev) => ({ ...prev, [key]: value }));
    if (key === "date1") setStartDate(value);
    if (key === "date2") setEndDate(value);
  };

  const handleTransactionTypeChange = (value) => {
    setTransactionType(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    refreshTransactions();
  };
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <div className="p-4 w-full main-div  rounded-tl-lg rounded-bl-lg font-rubik">
          <SidebarTrigger />
          <Card className="w-full sm:w-[60vw] lg:w-[30vw]">
            <CardHeader>
              <CardTitle>Filter by Date</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="mb-2">
                  <Label htmlFor="transaction-type">Income/Expense</Label>
                  <Select onValueChange={handleTransactionTypeChange}>
                    <SelectTrigger id="transaction-type">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-3 flex flex-col ">
                  <div className="mb-2 text-start">
                    <DatePicker
                      transactionDate={dates.date1}
                      setTransactionDate={(value) =>
                        handleSetDate("date1", value)
                      }
                      label="Start Date : "
                    />
                  </div>
                  <div className="text-start">
                    <DatePicker
                      transactionDate={dates.date2}
                      setTransactionDate={(value) =>
                        handleSetDate("date2", value)
                      }
                      label="End Date : "
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
          <Card className="mt-3">
            <Table className="text-center">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Description</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                  <TableHead className="text-center">Income/Expenses</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-center">Delete Entry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .slice()
                  .reverse()
                  .map((transaction) => {
                    const {
                      transaction_id,
                      description,
                      transaction_amount,
                      transaction_type,
                      transaction_date,
                      time_stamp,
                    } = transaction;

                    const date = time_stamp;
                    const localDate = new Date(
                      date.toLocaleString("en-US", {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })
                    );

                    // Set time to midnight (00:00:00)
                    localDate.setHours(0, 0, 0, 0);

                    // Format the date as "YYYY-MM-DD HH:mm:ss"
                    const formattedDate =
                      localDate.getFullYear() +
                      "-" +
                      String(localDate.getMonth() + 1).padStart(2, "0") +
                      "-" +
                      String(localDate.getDate()).padStart(2, "0");
                    return (
                      <TableRow key={transaction_id} className="text-center">
                        <TableCell>{description}</TableCell>
                        <TableCell>{transaction_amount}</TableCell>
                        <TableCell>{transaction_type}</TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            className="text-red-500 hover:text-red-400"
                            onClick={() => handleDelete(transaction_id)}
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </SidebarProvider>
    </>
  );
};

export default AllTransactions;
