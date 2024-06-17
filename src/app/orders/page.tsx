/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";

type Props = {};
type Payment = {
  order: string;
  status: string;
  lastOrder: string;
  method: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-200": row.getValue("status") === "Pending",
            "bg-orange-200": row.getValue("status") === "Processing",
            "bg-green-200": row.getValue("status") === "Completed",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order",
  },
  {
    accessorKey: "method",
    header: "Transaction ",
  },
];

const data: Payment[] = [
  {
    order: "ORD001",
    status: "Pending",
    lastOrder: "2023-01-15",
    method: "Air-algerie",
  },
  {
    order: "ORD002",
    status: "Processing",
    lastOrder: "2023-02-20",
    method: "Bank transfer",
  },
  {
    order: "ORD003",
    status: "Completed",
    lastOrder: "2023-03-10",
    method: "Tickets",
  },
  {
    order: "ORD004",
    status: "Pending",
    lastOrder: "2023-04-05",
    method: "Pay",
  },
  {
    order: "ORD005",
    status: "Completed",
    lastOrder: "2023-05-12",
    method: "Bank Transfer",
  },
  {
    order: "ORD006",
    status: "Processing",
    lastOrder: "2023-06-18",
    method: "Dahabia",
  },
  {
    order: "ORD007",
    status: "Completed",
    lastOrder: "2023-07-22",
    method: "Top Up",
  },
  {
    order: "ORD008",
    status: "Pending",
    lastOrder: "2023-08-30",
    method: "Algerie Poste",
  },
  {
    order: "ORD009",
    status: "Processing",
    lastOrder: "2023-09-05",
    method: "Alipay",
  },
  {
    order: "ORD010",
    status: "Completed",
    lastOrder: "2023-10-18",
    method: "Algerie telecom",
  },
  {
    order: "ORD011",
    status: "Pending",
    lastOrder: "2023-11-25",
    method: "Pay",
  },
  {
    order: "ORD012",
    status: "Completed",
    lastOrder: "2023-12-08",
    method: "Post Office",
  },
  {
    order: "ORD013",
    status: "Processing",
    lastOrder: "2024-01-15",
    method: "Dahabia",
  },
  {
    order: "ORD014",
    status: "Completed",
    lastOrder: "2024-02-20",
    method: "Dahabia",
  },
  {
    order: "ORD015",
    status: "Pending",
    lastOrder: "2024-03-30",
    method: "Credit Card",
  },
];

export default function OrdersPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Orders" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
