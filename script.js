'use strict'

// 1行目に記載している 'use strict' は削除しないでください
const myData = {};
const onoLib = {
    setTbody:(tbody,array)=>{
        for(const cols of array){
            const tr = document.createElement("tr");
            for(const value of cols){
                const td = document.createElement("td");
                if(value){
                    td.innerHTML = value;
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
}

window.onload=()=>{
    //攻略状況の集計
    const Area={};
    const Kekka={};
    for(const cols of tableData){
        if(cols[4] in Area){
            Area[cols[4]] ++ ;
        }else{
            Area[cols[4]] = 1 ;
        }
        if(cols[6]){
            if(cols[4] in Kekka){
                Kekka[cols[4]] ++ ;
            }else{
                Kekka[cols[4]] = 1 ;
            }
        }
    }
    const areaArray = [];
    for(const key in Area){
        const array = [];
        array.push(key);
        array.push(Area[key]);
        if(!Kekka[key])Kekka[key] = 0;
        array.push(Kekka[key]);
        array.push(Math.floor(Kekka[key]/Area[key]*100) + "%" );
        areaArray.push(array);
    }

    const tbody = document.getElementById("koryakuBody");
    onoLib.setTbody(tbody,areaArray);

    //百名山一覧の出力
    const yamaArray = tableData.map((value)=>{
        return [value[0],value[4],value[1],value[6]]
    })

    onoLib.setTbody(document.getElementById("yamaBody"),yamaArray);

}

