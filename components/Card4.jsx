import React from "react";
import { formatTIme } from "../lib/formatTIme";
import { truncateString } from "../lib/truncate";
import Card3 from "./Card3";

function Card4({url,title,subtitle,album,time=4.5,index}) {
  return (
    <div className="w-full flex justify-between p-3">
      <div className="flex items-center w-[45%]">
        <p className="text-white p-2">{index}</p>
        <Card3 subtitle={subtitle} title={title} img={url} sm={true} glass={false} />
      </div>
      <div className="w-[45%] flex justify-between items-center">
        <p className="text-slate-400">{truncateString(album,25)}</p>
        <p className="text-slate-400">{formatTIme(time)}</p>
      </div>
    </div>
  );
}

export default Card4;
