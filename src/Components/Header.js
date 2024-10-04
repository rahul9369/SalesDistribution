import React, { useState, useEffect, useRef } from "react";
import { MdForwardToInbox } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaBars, FaEllipsisV } from "react-icons/fa"; // Hamburger and three dots icons
import Sidebar from "../Components/Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Ref to detect outside clicks

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // useEffect to close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Adding event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Removing event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {/* Header Section */}
      <header className="bg-white shadow-md p-4 cursor-pointer flex justify-between items-center z-50 fixed top-0 left-0 w-full">
        <div className="flex flex-row items-center">
          {/* Hamburger Icon */}
          <span
            className="text-2xl cursor-pointer mr-4"
            onClick={toggleSidebar}>
            <FaBars />
          </span>
          <h1 className="text-xl font-bold mr-4">Dashboard</h1>
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg p-2"
          />
        </div>

        {/* Icons visible on large screens */}
        <div className="hidden sm:flex cursor-pointer flex-row">
          <span className="p-2 m-1 hover:bg-slate-100 bg-gray-200 rounded-full">
            <MdForwardToInbox />
          </span>
          <span className="p-2 bg-gray-200 m-1 hover:bg-slate-100 rounded-full">
            <IoIosNotifications />
          </span>
          <span className="p-2 bg-gray-200 m-1 hover:bg-slate-100 rounded-full">
            <CiSettings />
          </span>
        </div>

        {/* Three Dots Icon visible on mobile */}
        <div className="relative sm:hidden" ref={dropdownRef}>
          <span
            className="p-2 bg-gray-200 m-1 hover:bg-slate-100 rounded-full cursor-pointer"
            onClick={toggleDropdown}>
            <FaEllipsisV />
          </span>

          {/* Dropdown Menu on Mobile */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50">
              <ul className="py-1">
                <li className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <MdForwardToInbox />
                  <span>Message</span>
                </li>
                <li className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <IoIosNotifications />
                  <span>Notification</span>
                </li>
                <li className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <CiSettings />
                  <span>Settings</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Section */}
      <div
        className={`fixed top-0 left-0 h-full w-64 rounded-lg text-white p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
        style={{ marginTop: "64px" }} // Adjusting for header height
      >
        <Sidebar />
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}></div>
      )}

      {/* Main Content Section with blur effect */}
      <main
        className={`transition-filter duration-300 ease-in-out ${
          isSidebarOpen ? "filter blur-sm" : ""
        }`}
        style={{ paddingTop: "72px" }} // Adjusting for the fixed header height
      ></main>
    </>
  );
};

export default Header;
