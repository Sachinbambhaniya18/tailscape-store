import React from 'react';
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../../utilities/FadeInOnScroll';

const Services = () => {
  const services = [
    {
      title: 'Buying Animals',
      description:
        'Find and purchase a variety of pets like kittens, puppies, birds, and exotic creatures delivered to your doorstep.',
      link: '/pets',
      imgSrc: '/images/animals.jpg',
      imgAlt: 'Buying Animals',
      buttonTitle: 'Explore Pets',
    },
    {
      title: 'Animal-Related Products',
      description:
        'Shop premium pet food and products tailored to meet the dietary needs of all types of pets.',
      link: '/products',
      imgSrc: '/images/products.jpg',
      imgAlt: 'Animal Products',
      buttonTitle: 'Shop Products',
    },
    {
      title: 'Book Store Appointment',
      description:
        'Visit our store to explore pets, products, and accessories with personalized assistance.',
      link: '/store-appointment',
      imgSrc: '/images/store-appointment.jpg',
      imgAlt: 'Store Appointment',
      buttonTitle: 'Book Now',
    },
    {
      title: 'Veterinary Appointment',
      description:
        'Book a consultation with experienced vets for your pet’s health and routine check-ups.',
      link: '/vet-appointment',
      imgSrc: '/images/vet-appointment.jpg',
      imgAlt: 'Veterinary Appointment',
      buttonTitle: 'Book Now',
    },
  ];

  return (
    <FadeInOnScroll>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-black mb-6">
            Our Services
          </h1>
          <p className="text-lg text-gray-800 mb-12 max-w-3xl mx-auto">
            Everything your pet needs, all in one place! From finding the perfect furry companion to
            shopping for high-quality pet products, we’ve got you covered. Whether it’s expert
            veterinary care or personalized in-store guidance, our services are designed to ensure
            the health, happiness, and comfort of your beloved pets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col"
              >
                <img
                  src={service.imgSrc}
                  alt={service.imgAlt}
                  className="w-full h-40 object-contain rounded-t-lg mb-4"
                />
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <h2 className="text-2xl font-semibold text-black">
                    {service.title}
                  </h2>
                  <p className="text-gray-900 mt-2 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-block bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-600 transition duration-200"
                  >
                    {service.buttonTitle}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default Services;
