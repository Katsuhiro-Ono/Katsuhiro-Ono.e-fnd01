'use strict'

// 1行目に記載している 'use strict' は削除しないでください

const onoLib = {
    setTbody:(tbody,array,fnc)=>{
        for(const cols of array){
            const tr = document.createElement("tr");
            for(const value of cols){
                const td = document.createElement("td");
                if(value !== null){
                    td.innerHTML = value;
                }
                tr.appendChild(td);
            }
            if(fnc){
                tr.addEventListener("click",fnc);
                tr.cols = cols;
            }
            tbody.appendChild(tr);
        }
    }
}