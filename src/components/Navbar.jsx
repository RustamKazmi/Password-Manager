import React from "react";

const Navbar = () => {
  return (
    <>
      
        <nav className="flex h-14 sm:h-16 bg-[#536b57] sticky top-0 justify-around items-center">
          <div className="logo font-bold text-xl cursor-pointer">
            <a href="/">
            <span className="text-green-600"> &lt;</span>
            Pass
            <span className="text-green-600 text-xl">OP/&gt;</span></a>
          </div>

       
        <a href="https://github.com/" target="_blank"><button className="bg-green-700 border border-white text-green-800 flex justify-center items-center rounded-full">
          <img className="w-8 sm:w-10 invert p-1 " src="/icons/github.svg" alt="" />
     <span className="font-bold px-3 text-white" >Github</span>
        </button></a>
        </nav>
     
    </>
  );
};

export default Navbar;
