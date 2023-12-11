import { signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next/types"
import useCurrentUsers from "../hooks/useCurrentUsers";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import useMoviesList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";
export async function getServerSideProps(context: NextPageContext) {
  //check for active session
  const session = await getSession(context);
  //if no active session redirect back to auth
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }
  return { props: {} } //we had to return somthing(so we return empty props)
}
export default function Home() {
  //destructuring the properties from useCurrentUser hook
  const { data: movies = [] } = useMoviesList();
  //for favourite movies
  const { data: favorites = [] } = useFavorites();

  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending" data={movies} />
        <MovieList title="Favourites" data={favorites} />
      </div>
    </>
  )
}
