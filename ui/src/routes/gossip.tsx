import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/gossip")({
  beforeLoad: () => {
    throw redirect({ to: "/pals" });
  },
  component: () => null,
});
