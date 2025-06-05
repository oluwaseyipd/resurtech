import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useState, useEffect, useRef } from "react";
import Testimonial from "../components/Testimonial";


// Counter component with animation
const AnimatedCounter = ({ target, duration = 2000, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

    useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true,     // Whether animation should happen only once
      offset: 100,    // Offset (in px) from the original trigger point
      easing: 'ease-out-cubic', // Easing function
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * target;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, target, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);

  return (
    <div ref={counterRef} className="text-4xl font-bold text-primary mb-2">
      {displayValue}{suffix}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Give Tech Life. <br></br>
                <span className="text-primary">Give Someone Hope.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Resurtech is on a mission to reduce electronic waste and restore
                hope by refurbishing laptops for students, job seekers, and
                families in need. Together, we can bridge the digital divide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <a href="#join-movement">Donate a Laptop</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-1 border-secondary text-secondary bg-white hover:bg-secondary hover:text-white"
                >
                  <Link to="/about">Know More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                alt="Person using laptop for education"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tracker */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-gray-600">
              Together, we're making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">💻</div>
                <AnimatedCounter target={120} suffix="+" />
                <p className="text-lg text-gray-600">Laptops Given</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg" data-aos="fade-up" data-aos-delay="400">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">🌱</div>
                <AnimatedCounter target={2.1} decimals={1} />
                <p className="text-lg text-gray-600">Tons of eWaste Recycled</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg" data-aos="fade-up" data-aos-delay="600">
              <CardContent className="pt-6">
                <div className="text-5xl mb-4">❤️</div>
                <AnimatedCounter target={40} suffix="+" />
                <p className="text-lg text-gray-600">Volunteers Joined</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps, powerful impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                You Give
              </h3>
              <p className="text-gray-600">
                Donate your old laptop or contribute funds to help us acquire
                devices that need new life.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="400">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                We Repair or Recycle
              </h3>
              <p className="text-gray-600">
                Refurbish working devices and responsibly recycle unusable components.
              </p>
            </div>

            <div className="text-center" data-aos="fade-up" data-aos-delay="600">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Someone Gets Hope
              </h3>
              <p className="text-gray-600">
                Refurbished laptops go to students, job seekers, and families
                who need technology to thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <Testimonial />

      {/* Join the Movement CTA */}
      <section id="join-movement" className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join the Movement
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Every laptop donated, every volunteer hour, and every dollar
            contributed helps bridge the digital divide. Choose how you want to
            make an impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-auto p-6 flex flex-col items-center space-y-2 bg-white text-primary hover:bg-gray-100"
            >
              <Link to="/donate">
                <div className="text-2xl mb-2">💻</div>
                <span className="font-semibold">Donate Technology</span>
                <span className="text-sm opacity-80">
                  Give laptops a second life
                </span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-auto p-6 flex flex-col items-center space-y-2 bg-white text-primary hover:bg-gray-100"
            >
              <Link to="/volunteer">
                <div className="text-2xl mb-2">🙋‍♀️</div>
                <span className="font-semibold">Volunteer Time</span>
                <span className="text-sm opacity-80">
                  Help refurbish and distribute
                </span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-auto p-6 flex flex-col items-center space-y-2 bg-white text-primary hover:bg-gray-100"
            >
              <Link to="/partner">
                <div className="text-2xl mb-2">🤝</div>
                <span className="font-semibold">Partner With Us</span>
                <span className="text-sm opacity-80">
                  Collaborate for greater impact
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;