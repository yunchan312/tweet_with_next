"use client";

import { useRouter } from "next/navigation";

export const Refresh = () => {
  const router = useRouter();
  router.refresh();
};
