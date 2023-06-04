import Layout from "@/components/Layout";
import Information from "@/pages/Information";
import Test from "@/pages/Test";
import NotFound from "@/pages/NotFound";
import { Navigate } from "react-router-dom";
import MemberManager from "@/pages/Member";
import Movie from "@/pages/Movie";
import MovieShelf from "@/pages/MovieShelf";
import Theater from "@/pages/theater";
import RoomsIndex from "@/pages/theater/roomsIndex";
import Login from "../pages/Login";
import RouterInterceptor from "./RouterInterceptor";
import MovieDrag from "../pages/moviesDrag";

const routeConfig = [
  {
    path: "/",
    element: <RouterInterceptor inner={<Layout />} />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Information />,
      },
      {
        path: "/member",
        element: <MemberManager />,
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/movieShelf",
        element: <MovieShelf />,
      },
      {
        path: "/theater",
        element: <Theater />,
      },
      {
        path: "/room",
        element: <RoomsIndex />,
      },
      {
        path: "/seat",
        element: <Test />,
      },
      {
        path: "/test",
        element: <MovieDrag />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routeConfig;
