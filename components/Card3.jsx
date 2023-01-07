import React from "react";
import { truncateString } from "../lib/truncate";

function Card3({
  img = "https://i.scdn.co/image/ab67616d000048511b84102f154deb7a798ed372",
  title = "something",
  subtitle,
  glass=true,
  sm=false
}) {
  return (
    <div className={`${glass && 'glass_bg2'} w-[350px] ${sm? 'h-[40px]':'h-64px'} flex rounded-md overflow-hidden ${!sm && 'm-5'}`}>
      <img className={`${sm? 'w-[40px] h-[40px]':'w-[64px] h-[64px]'}`} loading='lazy' src={img} alt="img" />
      <div className="text-white flex flex-col justify-center">
        <p className="text-[15px] font-bold ml-2">{truncateString(title,13)}</p>
        <p className="text-[12px] ml-2">{subtitle && truncateString(subtitle,13)}</p>
      </div>
    </div>
  );
}

export default Card3;
