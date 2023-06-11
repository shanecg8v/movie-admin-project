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
import SeatsIndex from "@/pages/theater/seatsIndex";
import Login from "../pages/Login";
import RouterInterceptor from "./RouterInterceptor";
import MovieDrag from "../pages/moviesDrag";
import RoomsEdit from "../pages/theater/Components/RoomsEdit"; 
import TheaterEdit from "../pages/theater/Components/TheaterEdit"; 

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
        element: <MovieDrag />,
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
        element: <SeatsIndex />,
      },
      // {
      //   path: "/test",
      //   element: <MovieDrag />,
      // },
      {
        path: "/theaterEdit",
        element: <TheaterEdit />,
      },
      {
        path: "/roomsEdit",
        element: <RoomsEdit />,
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
