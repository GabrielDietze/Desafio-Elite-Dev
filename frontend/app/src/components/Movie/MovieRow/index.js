import React, {useState} from "react";
import "./movieRow.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function MovieRow({ title, items }) {
    const [scrollX, setScrollX] = useState(0);
    const itemWidthRem = 9.375; // 150px em rem

    const handleLeftArrow = () => {
       let valorScroll = scrollX + Math.round(window.innerWidth / 2);
       if(valorScroll > 0){
        valorScroll = 0;
       }
         setScrollX(valorScroll);
    }
    const handleRightArrow = () => {
        let valorScroll = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;
        if(window.innerWidth - listWidth > valorScroll){
            valorScroll = (window.innerWidth - listWidth);
        }
        setScrollX(valorScroll);
    }
    
    return (
        <div className="movieRow">
           <h2> {title} </h2>
            <div className="movieRow-left" onClick={handleLeftArrow}>
                <NavigateBefore style={{fontSize: 50}} />
            </div>
            <div className="movieRow-right" onClick={handleRightArrow}>
                <NavigateNext style={{fontSize: 50}} />
            </div>

           <div className="movieRow-listarea" >
            <div className="movieRow-list" style={
                {
                    marginLeft: scrollX,
                    width: items.results.length * itemWidthRem + "rem"
                }
            }>
            {items.results.length > 0 && items.results.map((item, key) => (
                <div className="movieRow-item" key={key}>
                    <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                </div>
            ))}
            </div> 

           </div>
        </div>
)}