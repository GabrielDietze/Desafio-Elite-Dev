import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./movieRow.css";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

export default function MovieRow({ title, items }) {
    const [scrollX, setScrollX] = useState(0);
    const itemWidthRem = 9.53; // 150px em rem

    const typeofItem = (item) => {
        if (item.media_type) {
            return item.media_type; // Caso a API já forneça o tipo (tv ou movie)
        } else if (item.first_air_date) {
            return 'tv'; // Se tiver data de primeira exibição, é série
        } else if (item.release_date) {
            return 'movie'; // Se tiver data de lançamento, é filme
        } else {
            return 'movie'; // Padrão caso nenhuma propriedade específica seja encontrada
        }
    };

    const handleLeftArrow = () => {
       let valorScroll = scrollX + Math.round(window.innerWidth / 2);
       if(valorScroll > 0){
        valorScroll = 0;
       }
         setScrollX(valorScroll);
    };

    const handleRightArrow = () => {
        // Pegar o valor atual de 'rem' da tela
        const htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); 
        const itemWidthPx = itemWidthRem * htmlFontSize; // Converter 'rem' para pixels
    
        // Calcular o valor do scroll ao mover metade da tela
        let valorScroll = scrollX - Math.round(window.innerWidth / 2);
    
        // Calcular a largura total da lista de itens com base na largura dinâmica
        let listWidth = items.results.length * itemWidthPx;
    
        // Verifica se o scroll foi além do limite da lista e ajusta o valor
        if (window.innerWidth - listWidth > valorScroll) {
            valorScroll = window.innerWidth - listWidth - 30; // Ajuste final para evitar espaçamento extra
        }
    
        setScrollX(valorScroll);
    };
    
    
    
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
            <div className="movieRow-list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * itemWidthRem + "rem"
                }}>
            {items.results.length > 0 && items.results.map((item, key) => (
                <div className="movieRow-item" key={key}>
                     <Link to={`/${typeofItem(item)}/${item.id}`}>
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title || item.name} />
                    </Link>
                </div>
            ))}
            </div> 
           </div>
        </div>
    );
}
