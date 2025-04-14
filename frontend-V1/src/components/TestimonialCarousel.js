// TestimonialCarousel.js

import React, { useRef, useState, useEffect } from 'react';
import './TestimonialCarousel.css';

const testimonials = [
  {
    id: 1,
    title: 'Found my phone!',
    text: 'I thought I lost my phone forever but Foundly helped me get it back within a day.',
    author: 'Ananya, Student',
    image: require('../assets/user1.png'),
  },
  {
    id: 2,
    title: 'Amazing Experience',
    text: 'The process was smooth and the team is super responsive.',
    author: 'Rahul, IT Employee',
    image: require('../assets/user2.png'),
  },
  {
    id: 3,
    title: 'Quick & Easy',
    text: 'I listed my lost wallet and someone reached out within hours. Highly recommended!',
    author: 'Priya, Designer',
    image: require('../assets/user3.png'),
  },
  {
    id: 4,
    title: 'Life Saver!',
    text: 'Left my headphones at college and someone returned them thanks to Foundly.',
    author: 'Vikram, Intern',
    image: require('../assets/user4.png'),
  }
];

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = carouselRef.current;
    if (container) {
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < testimonials.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;

    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    if (container) {
      container.addEventListener('scroll', onScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div className="testimonial-carousel-wrapper">
      <div className="carousel-arrow left" onClick={handlePrev}>
        ❮
      </div>

      <div className="testimonial-carousel" ref={carouselRef}>
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <img src={testimonial.image} alt={testimonial.author} className="testimonial-img" />
            <h3 className="testimonial-title">{testimonial.title}</h3>
            <p className="testimonial-text">“{testimonial.text}”</p>
            <span className="testimonial-author">– {testimonial.author}</span>
          </div>
        ))}
      </div>

      <div className="carousel-arrow right" onClick={handleNext}>
        ❯
      </div>

      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
