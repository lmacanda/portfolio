import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { navLinks } from "../constants/index";

import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

import { styles } from "../styles";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ulRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ulRef.current && !ulRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ulRef]);

  return (
    <nav
      className={`${
        styles.paddingX
      }  w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <h1 className="jersey-25-charted-regular text-2xl">LM</h1>
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Laura Macanda
            <span className="sm:block hidden"> | Front-End Developer</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((Link) => (
            <li
              key={Link.id}
              className={`${
                active === Link.title ? "text-white" : "text-purple-400"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(Link.title)}
            >
              <a href={`#${Link.id}`}>{Link.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          {!toggle && (
            <img
              src={menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          )}

          {toggle && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={() => setToggle(false)}
            />
          )}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0  my-2 min-w-[140px] z-10 rounded-xl`}
            ref={ulRef}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
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
