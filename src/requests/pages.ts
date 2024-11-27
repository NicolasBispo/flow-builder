import apiClient from "@/config/api-client";
import { Page } from "@prisma/client";

export  async function listPages() {
  const { data } = await apiClient<Page[]>({
    method: "GET",
    url: "/pages",
  });
  return data;
}

export  async function createPage() {
  const { data } = await apiClient<Page>({
    method: "POST",
    url: "/pages",
  });
  return data;
}
