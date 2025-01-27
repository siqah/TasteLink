import ContentBelowNav from "../components/ContentBelowNav";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <div className="font-sans container mx-auto">
        <div className="container mx-auto">
          <NavBar />
          <ContentBelowNav />
        </div>
        <h1></h1>
      </div>
    </>
  );
};

export default Home;
