import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { useState, useEffect, useRef } from "react";

const Testimonial = () => {
 const [currentIndex, setCurrentIndex] = useState(1); // start from 1 due to clone at the beginning
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideRef = useRef(null);

  const testimonials = [
    {
      quote: "I received a laptop through Resurtech and used it to complete my UI/UX course. Today, I've landed my first remote job!",
      name: "Grace E.",
      location: "Lagos",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "I always kept my old gadgets at home because I didn't know what to do with them. Now I donate them to Resurtech, and it feels good to know they're helping someone else.",
      name: "Femi A.",
      location: "Abuja",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "Volunteering with Resurtech opened my eyes to how much impact a single laptop can make.",
      name: "Ibrahim Y.",
      location: "Volunteer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "My daughter needed a laptop for her online classes during the pandemic. Resurtech helped us when we couldn't afford one. She's now excelling in her studies!",
      name: "Amina S.",
      location: "Kano",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "As a startup founder, donating our old equipment through Resurtech allows us to give back to the community while being environmentally responsible.",
      name: "Chidi O.",
      location: "Port Harcourt",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const visibleSlides = 3;
  const totalSlides = testimonials.length;
  const clonedSlides = [
    testimonials[totalSlides - 1], // clone last
    ...testimonials,
    testimonials[0] // clone first
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  const nextSlide = () => {
    if (currentIndex >= totalSlides + 1) return;
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex <= 0) return;
    goToSlide(currentIndex - 1);
  };

  // Handle looping
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEnd = () => {
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(totalSlides);
      } else if (currentIndex === totalSlides + 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
    };

    const slider = slideRef.current;
    slider.addEventListener("transitionend", transitionEnd);

    return () => slider.removeEventListener("transitionend", transitionEnd);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideWidth = 100 / visibleSlides;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories of Hope</h2>
          <p className="text-xl text-gray-600">Real people, real impact</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={slideRef}
              className={`flex transition-transform duration-500 ease-in-out`}
              style={{
                width: `${(clonedSlides.length * 100) / visibleSlides}%`,
                transform: `translateX(-${currentIndex * slideWidth}%)`,
                transition: isTransitioning ? "transform 0.5s ease" : "none"
              }}
              onTransitionEnd={() => setIsTransitioning(true)}
            >
              {clonedSlides.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-4"
                  style={{ width: `${slideWidth}%`, flexShrink: 0 }}
                >
                  <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg h-full">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-6 text-primary">"</div>
                      <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">{testimonial.quote}</p>
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full mr-4 border-2 border-primary/20"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                          <p className="text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
