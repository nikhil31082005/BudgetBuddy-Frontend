import React from "react";

function Services() {
  return (
    <>
      <div id="services" className="bg-gray-100 min-h-screen py-20">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a variety of web development services tailored to meet
              your project needs, whether you're looking for frontend, backend,
              or full-stack development.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Frontend Development */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-blue-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4v16h18V4H3zm18-2h-7v2H7V2H3a2 2 0 00-2 2v16a2 2 0 002 2h18a2 2 0 002-2V4a2 2 0 00-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Frontend Development
              </h3>
              <p className="text-gray-600">
                Craft visually appealing and responsive interfaces using the
                latest technologies like React.js, Tailwind CSS, and more.
                Enhance user experiences with modern and dynamic UIs.
              </p>
            </div>

            {/* Service 2: Backend Development */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-green-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.5 13h13M5.5 11h13M5.5 9h13m-2 9.5a2.5 2.5 0 005-5h-5v5zm0 0V22h5a2.5 2.5 0 00-5-5zM5.5 22V9m-2 7.5h13"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">
                Backend Development
              </h3>
              <p className="text-gray-600">
                Build scalable and secure backend systems using Node.js,
                Express, and MongoDB. Ensure that your server-side logic and
                database are optimized for performance and security.
              </p>
            </div>

            {/* Service 3: Full Stack Development */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-purple-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 11V5a2 2 0 012-2h10a2 2 0 012 2v6M5 11h14M5 11v6a2 2 0 002 2h10a2 2 0 002-2v-6M5 11h14"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
                Full Stack Development
              </h3>
              <p className="text-gray-600">
                Combine the best of both frontend and backend development to
                create full-stack applications. Utilize the MERN stack (MongoDB,
                Express, React, Node.js) to deliver comprehensive solutions.
              </p>
            </div>

            {/* Service 4: API Development */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-red-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12h18M9 16l6-4-6-4v8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">
                API Development
              </h3>
              <p className="text-gray-600">
                Develop secure, efficient, and scalable APIs for your web and
                mobile applications. Integrate third-party services and optimize
                your API architecture for performance.
              </p>
            </div>

            {/* Service 5: Database Management */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-yellow-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20v-6m0 0V4m0 10l-6 6M18 16v6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-yellow-600 mb-4">
                Database Management
              </h3>
              <p className="text-gray-600">
                Handle large datasets with ease, implementing efficient database
                management systems like MongoDB. Ensure data integrity,
                security, and optimized query performance.
              </p>
            </div>

            {/* Service 6: Cloud Integration */}
            {/* <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-indigo-600 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 15a4 4 0 014-4h2a4 4 0 014-4 4 4 0 013 5.372M16 13a4 4 0 013 5.372M6 19l-1.5-1.5M10 19l-1.5-1.5"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                Cloud Integration
              </h3>
              <p className="text-gray-600">
                Integrate cloud services like AWS, Google Cloud, and others to
                enhance scalability and reliability. Seamlessly deploy and
                manage your applications in the cloud.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
