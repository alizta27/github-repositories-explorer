import { Landing, Search } from "@/pages";

const publicRoute = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/search",
    element: <Search />,
  },
];

export default publicRoute;
