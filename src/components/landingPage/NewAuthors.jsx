

const NewAuthors = () => {
  return (
    <section className="bg-gray-900 bg-opacity-70">
      <div className="max-w-6xl mx-auto flex flex-col py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
            Spotlight Author of the Month
          </h1>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            John Doe is a celebrated author known for his gripping thrillers and
            thought-provoking narratives.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-16">
          {/* Author Information */}
          <div className="w-72 sm:w-96 md:w-80">
            <img
              src="https://i.ibb.co.com/x672Gs0/images.jpg"
              alt="Featured Author"
              className="rounded-full w-full h-auto mb-6"
            />
          </div>
          <div className="text-left max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-400 mb-4">
              John Doe
            </h3>
            <p className="text-lg sm:text-xl text-gray-300 mb-4">
              John Doe is a celebrated author known for his gripping thrillers
              and thought-provoking narratives. With a passion for storytelling,
              his books explore complex characters and moral dilemmas, drawing
              readers into unexpected twists.
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Discover the author&apos;s most popular books and immerse yourself
              in their world of suspense and intrigue.
            </p>

            {/* List of Popular Books */}
            <h4 className="text-xl sm:text-2xl font-semibold text-blue-500 mb-2">
              Popular Books:
            </h4>
            <ul className="list-disc list-inside text-gray-400 text-lg sm:text-xl">
              <li>
                &quot;The Silent Witness&quot; - A psychological thriller with a
                shocking twist.
              </li>
              <li>
                &quot;Behind Closed Doors&quot; - A story of secrets and
                betrayal.
              </li>
              <li>
                &quot;The Last Goodbye&quot; - A touching yet suspenseful
                narrative of lost love and redemption.
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="https://www.linkedin.com/in/nur-araf-shishir-4798a4308/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
              >
                Learn More About John Doe
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewAuthors