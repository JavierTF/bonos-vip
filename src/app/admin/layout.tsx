"use client";

import { ToastProvider } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
    if (userSession == null) {
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: "Debe autenticarse como administrador...",
      });

      setTimeout(() => {
        router.push("/form");
      }, 2000);
    } else {
      const { user } = JSON.parse(userSession);
      if (user.role !== "admin") {
        toast({
          variant: "destructive",
          title: "Acceso denegado",
          description: "Debe autenticarse como administrador...",
        });
        router.push("/");
        return;
      } else {
        setIsAuthorized(true);
      }
    }
  }, [router, toast]);

  return (
    <ToastProvider>
      {isAuthorized && <div>{children}</div>}
      <Toaster />
    </ToastProvider>
  );
}
