import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="w-full bg-[#536b57] h-16">
        <div className="logo text-center">
          <div className="logo font-bold text-2xl">
            <span className="text-green-500"> &lt;</span>
            Pass
            <span className="text-green-500 text-xl">OP/&gt;</span>
          </div>
        </div>
        <div className="creator flex justify-center">
           <span> Created with </span> <span> <img className="w-7 mx-1" src="/icons/heart.png" alt="heart" /></span><span> by Rustam Kazmi</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
