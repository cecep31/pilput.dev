import Link from "next/link";

const Landing = () => {
  return (
    <div
      className="font-mono flex justify-center items-center w-full"
      style={{ height: "670px" }}
    >
      <div className="relative z-20 h-full flex justify-center items-center">
        <div className="flex flex-col items-center container mx-auto">
          <p className="my-6 font-bold text-xl md:text-6xl text-center text-black dark:text-white">
            Hi, I&#x27;m <span className="text-blue-600 ">CECEP JANUARDI</span>
          </p>
          <h2 className="max-w-3xl py-2 mx-auto text-lg font-bold text-center text-gray-800 md:text-4xl dark:text-white">
            Full Stack Developer
          </h2>
          <p className="text-center text-gray-800 md:text-4xl dark:text-white">
            This website contains my experiments in web programming.
          </p>
          <div className="flex items-center justify-center mt-4">
            <Link
              href="https://github.com/cecep31"
              className="text-gray-700 ml-3 hover:text-gray-50 bg-gray-100 hover:bg-gray-800 p-2 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-github"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </Link>
            <Link
              className="text-gray-700 ml-3 hover:text-gray-50 bg-gray-100 hover:bg-gray-800 p-2 rounded-xl"
              href="https://www.linkedin.com/in/cecep31/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
