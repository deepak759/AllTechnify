
const Home = () => {
  return (
    <div className=" bg-gray-50 flex items-center">
      <section
        className="bg-cover bg-center py-32 w-full"
        style={{
          backgroundImage: "url('https://t3.ftcdn.net/jpg/05/14/95/12/240_F_514951224_2dxMLbIw5qNRdPGD003chpbVcxWtcp7K.jpg')",
        }}
      >
        <div className="container mx-auto text-left text-white">
          <div className="flex items-center">
            <div className="w-1/2">
              <h1 className="text-5xl font-medium mb-6">Welcome to My Agency</h1>
              <p className="text-xl mb-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                viverra euismod odio, gravida pellentesque urna varius vitae.
              </p>
              <a
                href="#"
                className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600"
              >
                Demo
              </a>
            </div>
            <div className="w-1/2 pl-16">
              <img
                src="https://t3.ftcdn.net/jpg/04/95/07/94/240_F_495079449_lyaeIerlTZN4VCcsvyqWB6kvigARppTY.jpg"
                className="h-64 w-full object-cover rounded-xl"
                alt="Layout Image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
