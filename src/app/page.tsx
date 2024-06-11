/** @format */
"use client";
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Transactions",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];
type Data = {
  count: number;
  usersData: Users[];
};

type Users = {
  name: string;
  email: string;
  balance: string;
};

export default function Home() {
  const [data, setData] = useState<Data>({ count: 0, usersData: [] });

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/getUsers").then((res) => res.json());
      setData(res);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-start gap-4">
          <section>
            <p>{"Recent signUp's"}</p>
            <p className="text-sm text-gray-400">
              total accounts {data.count} this month.
            </p>
            <Link href={"/users"} className="text-blue-500">
              View All
            </Link>
          </section>
          <div className="flex flex-col gap-2">
            <Suspense fallback={<SkeletonComp />}>
              {data?.usersData?.map((d: any, i: number) => (
                <SalesCard
                  key={i}
                  email={d.email}
                  name={d.name}
                  balance={d.balance}
                />
              ))}
            </Suspense>
          </div>
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}

function SkeletonComp() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
