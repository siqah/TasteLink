import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

const Home = () => {
  const {authState} = useContext(AuthContext)
  const {user} = authState;
  return (
    <>
      <div className="font-sans container mx-auto min-h-screen w-80%">
        <div className="container mx-auto">
          <NavBar />
        </div>
        <section className="flex max-auto mt-2">
          <aside className="w-[250px]  rounded-sm shadow-md bg-white p-2 mr-4">
            {user ?  <Sidebar /> : null}
          </aside>
          <main>
            <CreatePost />
            <PostList />
          </main>
        </section>
      </div>
    </>
  );
};

export default Home;
