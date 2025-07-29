import { Layout } from "@/components";
import { HomePage, NewPollPage, PollPage, PollsPage } from "@/pages";
import type { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "/polls", Component: PollsPage },
      { path: "/polls/:id", Component: PollPage },
      { path: "/polls/new", Component: NewPollPage },
    ],
  },
];

export default routes;
