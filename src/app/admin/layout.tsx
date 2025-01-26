"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userSession = localStorage.getItem("bonos-vip");
    if (!userSession) {
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Debe autenticarse como administrador...",
      });

      setTimeout(() => {
        router.push("/form");
        return;
      }, 1500);
    }

    try {
      if (userSession) {
        const { user } = JSON.parse(userSession);
        if (user.role !== "admin") {
          router.push("/");
          return;
        }
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("bonos-vip");
      router.push("/form");
    }
  }, [router]);

  if (!isAuthorized) return null;

  return <div>{children}</div>;
}
