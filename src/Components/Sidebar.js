import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import { FaTree } from "react-icons/fa";
import { IoPricetagOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="h-screen w-84 rounded-lg bg-white shadow-md p-4 overflow-y-auto">
      {/* Logo Section */}

      {/* Menu Items */}
      <nav>
        <div className="mb-6">
          <h4 className="text-gray-600 text-xl ml-4 cursor-pointer font-bold mb-2">
            HOME
          </h4>
          <div className="bg-blue-100 rounded-lg py-1 cursor-pointer px-5 flex flex-row text-blue-500 font-semibold">
            <span className="text-3xl">
              <IoCartOutline />
            </span>
            eCommerce
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-gray-600 text-xl cursor-pointer font-bold ml-3 mb-2">
            App
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <MdOutlinePermContactCalendar />
              <span>Contacts</span>
            </li>
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <IoChatbubbleEllipsesOutline />
              <span>Chats</span>
            </li>
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <SlCalender />
              <span>Calendar</span>
            </li>
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <MdOutlineMailOutline />
              <span>Email</span>
            </li>
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <BsTicketPerforated />
              <span>Tickets</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-gray-600 font-bold text-xl cursor-pointer ml-2 mb-2">
            Page
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold text-lg cursor-pointer px-2 py-1 items-center space-x-1">
              <FaTree />
              <span>Tree view</span>
            </li>
            <li className="flex hover:bg-slate-100 rounded-lg font-semibold cursor-pointer text-lg px-2 py-1 items-center space-x-1">
              <IoPricetagOutline />
              <span>Pricing</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* User Section */}
      <div className="mb-16 flex flex-col items-center space-y-3 pt-6 border-t">
        <div className="flex items-center space-x-2">
          <img
            src="https://www.sportico.com/wp-content/uploads/2020/09/0911_IMG.jpg"
            alt="User"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="text-2xl text-black font-semibold">Rahul</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <div className="flex p-5 space-x-4">
          <button className="flex hover:bg-slate-100 font-semibold text-lg px-1 py-1 items-center space-x-1 text-gray-500">
            <CiSettings />
            <span>Setting</span>
          </button>
          <button className="flex hover:bg-slate-100 font-semibold text-lg px-1 py-1 items-center space-x-1 text-gray-500">
            <IoIosLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
