// import Card from "./Card"
type CardProps = {
    title: string;
    description: string;
}

const Card = ({ title, description }: CardProps) => {
  return (
    <div className="bg-text cursor-pointer shadow-md rounded-2xl p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-4 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-[#e0c3fc] hover:to-[#8ec5fc] hover:rotate-2">
      <h2 className="text-xl text-gray-800 font-extrabold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

type CarouselProps = {
    data: CardProps[];
    heading: string;
}

const Carousel = ({data, heading} : CarouselProps) => {
    return (
        <div className="px-8 py-4 shadow-md rounded-lg">
              <h1 className="mb-5 text-2xl">{heading}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
        </div>
    );
};

export default Carousel;