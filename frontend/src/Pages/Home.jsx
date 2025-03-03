import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";
import PostList from "../components/PostList";

const Home = () => {
  const {authState} = useAuth();
  const {user} = authState;
  return (
    <>
      <div className="font-sans container mx-auto min-h-screen w-80%">
        <div className="container mx-auto">
          <NavBar />
        </div>
        <section className="flex max-auto mt-2">
          <aside className={`rounded-sm shadow-md bg-white p-2 mr-4 ${user ? 'w-[250px]' : 'w-0'}`}>
            {user ? <Sidebar /> : null}
          </aside>
          <main>
            <PostList />
          </main>
        </section>
      </div>
    </>
  );
};

export default Home;
