import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector(state => state.cart.cartItems)

const {currentUser,logoutUser} = useAuth()

const handleLogout = ()=>{
  logoutUser()
}
  

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
  ];
  return (
    <header className="max-w-screen-2xl mx-auto px-4  py-6">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex item-center md:gap-16 gap-8 ">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-5" />
          </Link>

          {/* search input */}

          <div className="relative sm:w-72 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-3 inset-y-2 size-5" />
            <input
              type="text"
              name=""
              id=""
              placeholder="what are you looking for ?"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-5 ">
          {currentUser ? (
            <>
              <button
                className={`size-6 rounded-full  ${
                  currentUser ? "ring-2 ring-blue-500 " : ""
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img src={avatar} alt="" />
              </button>

              {/* show dropdowns */}
              {isDropdownOpen && (
                <div className="absolute mt-52 right-0  w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">{item.name}</Link>
                      </li>
                    ))}

<li>
  <button className="block px-4 py-2 text-sm hover:bg-gray-100"
  onClick={handleLogout}
  >Log out</button>
</li>

                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <FaRegUser className="size-5" />
            </Link>
          )}

          <button className="hidden sm:block">
            <IoMdHeartEmpty className="size-5" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <MdOutlineShoppingCart />
            {
              cartItems.length > 0 ?
            <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>:
            <span className="text-sm font-semibold sm:ml-1">0</span>


            }
          
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
