import React, { useState, useEffect } from 'react';
import './style.css';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { background: '#EA3D41', content: 'Strawberry', img: '/img/fruit_strawberry.png' },
    { background: '#2D5643', content: 'Avocado', img: '/img/fruit_avocado.png' },
    { background: '#E7A043', content: 'Orange', img: '/img/fruit_orange.png' }
  ];
  

  const [leftMockup, setLeftMockup] = useState(0);
  const leftEachItem = 100 / (items.length - 1);

  const nextItem = () => {
    setActiveIndex((prevIndex) => (prevIndex >= items.length - 1 ? 0 : prevIndex + 1));
    setLeftMockup((prevLeft) => prevLeft + leftEachItem);
  };
  
  const prevItem = () => {
    setActiveIndex((prevIndex) => (prevIndex <= 0 ? items.length - 1 : prevIndex - 1));
    setLeftMockup((prevLeft) => prevLeft - leftEachItem);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextItem();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="App">
      <header>
        <div>LUNDEV</div>
        <nav>
          <ul>
            <li>HOME</li>
            <li>CONTACT</li>
            <li>INFO</li>
          </ul>
        </nav>
      </header>

      <div className="carousel">
        <div className="list">
          {items.map((item, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex ? 'active' : index < activeIndex ? 'hidden' : ''}`}
              style={{ '--background': item.background }}>
              <div className="content">{item.content}</div>
              <img src={item.img} className="fruit" alt={item.content} />
            </div>
          ))}
        </div>
        <div className="leaves"></div>
        <div className="mockup" style={{ '--left': `${leftMockup}%` }}></div>
        <div className="shadow"></div>
        <div className="arrow">
          <button id="prev" onClick={prevItem}>{'<'}</button>
          <button id="next" onClick={nextItem}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
