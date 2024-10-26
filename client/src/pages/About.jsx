import React from "react";

const About = () => {
  return (
    <>
      <section className="about-us-section py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap mb-8">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0 pt-32">
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="mb-4 text-justify">
                Welcome to MentalHelp PH—your dedicated mental health support
                platform for Cebu City and surrounding areas. We aim to simplify
                the connection between users and qualified
                psychologists/psychiatrist, offering personalized
                recommendations through our comprehensive database. Our mission
                is to ensure users across Cebu receive the mental health support
                they need.
              </p>
              <p className="text-justify">
                Our platform is designed with accessibility and convenience in
                mind. By partnering with licensed Cebu-based
                psychologists/psychiatrist, we provide a seamless consultation
                experience, helping students easily find and connect with local
                mental health professionals.
              </p>
            </div>

            <div className="lg:w-1/2 w-full">
              <img
                src="/logonn.png"
                alt="About Us"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="lg:w-1/3 w-full bg-white p-6 text-green-700 border-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-justify">
                Our mission is to break down barriers to mental health care by
                providing a user-friendly platform for students to access
                professional psychological support.
              </p>
            </div>
            <div className="lg:w-1/3 w-full bg-green-600 p-6 text-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-justify">
                We envision a world where mental health care is readily
                accessible to everyone, and seeking help is as easy as a few
                clicks.
              </p>
            </div>
            <div className="lg:w-1/3 w-full text-green-700 p-6 bg-white border-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Our Values</h3>
              <ul className="list-disc list-inside">
                <li>Accessibility</li>
                <li>Convenience</li>
                <li>Professionalism</li>
                <li>Empathy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MentalHelp PH. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default About;
