import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debug function to check if sections exist
  useEffect(() => {
    // Check if all section elements exist
    navLinks.forEach(nav => {
      const element = document.getElementById(nav.id);
      console.log(`Section "${nav.id}": ${element ? 'Found' : 'Not found'}`);
    });
  }, []);

  const handleNavLinkClick = (title, id) => {
    setActive(title);
    setToggle(false);
    
    console.log(`Attempting to navigate to section: ${id}`);
    
    // Try multiple selector approaches
    const element = document.getElementById(id);
    const sectionElement = document.querySelector(`section[id="${id}"]`);
    const dataElement = document.querySelector(`[data-section-id="${id}"]`);
    
    console.log(`getElementById result: ${element ? 'Found' : 'Not found'}`);
    console.log(`querySelector section result: ${sectionElement ? 'Found' : 'Not found'}`);
    console.log(`querySelector data-attr result: ${dataElement ? 'Found' : 'Not found'}`);
    
    // Try to find the element by any means
    const targetElement = element || sectionElement || dataElement;
    
    if (targetElement) {
      // Scroll with a slight delay to ensure DOM is ready
      setTimeout(() => {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for navbar height
          behavior: 'smooth'
        });
      }, 100);
    } else {
      // Fallback to hash-based navigation
      console.warn(`Element with id "${id}" not found, using fallback`);
      window.location.hash = id;
    }
  };

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Antonio &nbsp;
            <span className='sm:block hidden'> | JavaScript Mastery</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => handleNavLinkClick(nav.title, nav.id)}
            >
              {/* Use button instead of anchor to prevent default hash behavior */}
              <button className="text-inherit font-inherit">{nav.title}</button>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => handleNavLinkClick(nav.title, nav.id)}
                >
                  {/* Use button instead of anchor to prevent default hash behavior */}
                  <button className="text-inherit font-inherit">{nav.title}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
