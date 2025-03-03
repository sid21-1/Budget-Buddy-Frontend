import React from "react";
import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Transactions = ({ transactions }) => {
  return (
    <>
      <Card className="w-full">
        <Table>
          <TableCaption>A list of recent Expenses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Expenses</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .slice()
              .reverse()
              .filter((transaction) => transaction.transaction_type != "income")
              .slice(0, 5)
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
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  })
                );

                localDate.setHours(0, 0, 0, 0);

                const formattedDate =
                  localDate.getFullYear() +
                  "-" +
                  String(localDate.getMonth() + 1).padStart(2, "0") +
                  "-" +
                  String(localDate.getDate()).padStart(2, "0");

                return (
                  <TableRow key={transaction_id}>
                    <TableCell className="font-medium">{description}</TableCell>
                    <TableCell>{transaction_amount}</TableCell>
                    <TableCell>{transaction_type}</TableCell>
                    <TableCell className="text-left">{formattedDate}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default Transactions;
