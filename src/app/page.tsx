/** @format */
"use client";
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { useEffect, useState } from "react";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";

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
    label: "Sales",
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

type Users = {
  name: string;
  email: string;
  balance: string;
};

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
   
    async function fetchUsers() {
      const data = await fetch("/api/getUsers").then((res) => res.json());
      setUsers(data.usersData);
      console.log(data);
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
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
            <button className="text-blue-500">View All</button>
          </section>

          <div className="flex flex-col gap-2">
            {users.map((d, i) => (
              <SalesCard
                key={i}
                email={d.email}
                name={d.name}
                balance={d.balance}
              />
            ))}
          </div>
        </CardContent>

        {/*  */}
      </section>
    </div>
  );
}
