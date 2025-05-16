import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

const GenreData = [
  { title: "Lo-Fi", description: "This is the first card." },
  { title: "Chill", description: "Here is the second card." },
  { title: "Study", description: "And this is the third one." },
  { title: "Workout", description: "This is the fourth card." },
  { title: "Indie", description: "Here is the fifth card." },
  { title: "Techno", description: "And this is the sixth one." },
];

const RecentData = [
  { title: "First Card", description: "This is the first card." },
  { title: "Second Card", description: "Here is the second card." },
  { title: "Third Card", description: "And this is the third one." },
  { title: "Fourth Card", description: "This is the fourth card." },
  { title: "Fifth Card", description: "Here is the fifth card." },
  { title: "Sixth Card", description: "And this is the sixth one." },
];

const RecommendedData = [
  { title: "First Card", description: "This is the first card." },
  { title: "Second Card", description: "Here is the second card." },
  { title: "Third Card", description: "And this is the third one." },
  { title: "Fourth Card", description: "This is the fourth card." },
  { title: "Fifth Card", description: "Here is the fifth card." },
  { title: "Sixth Card", description: "And this is the sixth one." },
];

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-col gap-4 w-full h-full bg-primary text-text p-4">
        <Header/>

        {/* Main Content for Dashboard */}
        <div className="max-h-full overflow-y-scroll mb-12 scrollbar-hide scroll-smooth">
          <Carousel heading="Recently Listening . . ." data={RecentData} />
          <Carousel heading="What's your vibe ?" data={GenreData} />
          <Carousel heading="Recommended for you !" data={RecommendedData} />
        </div>

        <Footer />
      </section>
    </>
  );
};

export default Dashboard;
