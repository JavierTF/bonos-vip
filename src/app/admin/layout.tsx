"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("bonos-vip");
    if (!userSession) {
      router.push("/login");
      return;
    }

    try {
      const { user } = JSON.parse(userSession);
      if (user.role !== "admin") {
        router.push("/");
        return;
      }
      setIsAuthorized(true);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("bonos-vip");
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) return null;

  return <div>{children}</div>;
}