import React, { useState } from "react";
import useAddTransaction from "../hooks/useAddTransaction";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import DatePicker from "../components/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const IncomeExpenseForm = ({ setTransactions, transactionTotals }) => {
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());

  const { name, profilePhoto, userId } = useGetUserInfo();
  const { addTransaction } = useAddTransaction({ setTransactions });

  const defaultName = "User";

  const handleRadioChange = (e) => {
    setTransactionType(e.target.value);
    setShowDropdown(e.target.value === "expense");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!transactionAmount || transactionAmount <= 0) {
      alert("Please enter a value greater than zero");
      return;
    }
    if (
      transactionType === "expense" &&
      transactionTotals.balance - transactionAmount <= 0
    ) {
      alert("Balance cannot be negative");
      return;
    }
    addTransaction({
      userId,
      description,
      transactionAmount,
      transactionType,
      transactionDate,
    });

    setDescription("");
    setTransactionAmount(0);
  };

  return (
    <>
      <Card className="w-full h-[100%]">
        <CardHeader>
          <CardTitle className="text-2xl">Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-green-500 text-3xl">
            ₹{transactionTotals.balance || 0}
          </span>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Income & Expense</DialogTitle>
                <DialogDescription>
                  Enter your transaction details and submit.
                </DialogDescription>
              </DialogHeader>
              <form
                className="add-transaction flex flex-col w-full"
                onSubmit={onSubmit}
              >
                <div className="flex flex-col">
                  <Input
                    className="w-full mb-3"
                    type="text"
                    value={description}
                    placeholder="Description"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Input
                    className="w-full mb-3"
                    type="number"
                    value={transactionAmount}
                    placeholder="Amount"
                    required
                    onChange={(e) =>
                      setTransactionAmount(Number(e.target.value))
                    }
                  />
                  <DatePicker
                    transactionDate={transactionDate}
                    setTransactionDate={setTransactionDate}
                    label="Select Date:"
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="radio"
                    value="expense"
                    checked={transactionType === "expense"}
                    id="expense"
                    onChange={handleRadioChange}
                  />
                  <label className="mr-6" htmlFor="expense">
                    Expense
                  </label>
                  <input
                    type="radio"
                    value="income"
                    id="income"
                    checked={transactionType === "income"}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="income">Income</label>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default IncomeExpenseForm;
