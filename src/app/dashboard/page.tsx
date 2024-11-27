"use client";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/user-context";
import { createPage, listPages } from "@/requests/pages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function DashboardPage() {
  const { user } = useContext(UserContext);
  const { push } = useRouter();
  const { data: pages } = useQuery({
    queryKey: ["pages"],
    queryFn: listPages,
    initialData: [],
    enabled: Boolean(user),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const createPageMutation = useMutation({
    mutationKey: ["create", "page"],
    mutationFn: createPage,
    onSuccess: async (page) => {
      push(`/dashboard/page/${page.id}`);
    },
  });
  return (
    <div className="flex flex-col gap-2 px-3 py-5">
      {pages.map((page) => (
        <Link className="w-full p-3 bg-primary/20 rounded-lg border border-primary/20" key={page.id} href={`/dashboard/page/${page.id}`}>
          {page.title}
        </Link>
      ))}
      <Button
        onClick={() => createPageMutation.mutateAsync()}
        className="w-full bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary rounded-2xl border border-dashed h-32 flex items-center justify-center"
      >
        Add new page <Plus />
      </Button>
    </div>
  );
}
