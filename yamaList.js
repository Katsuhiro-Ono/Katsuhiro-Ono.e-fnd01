'use strict'

// 1行目に記載している 'use strict' は削除しないでください
let thoChoArray = [];
let tochoNum = 0;

window.onload=()=>{

	//モーダル閉じる
    document.getElementsByClassName("modal-close").item(0).addEventListener("click",function(){
        document.getElementsByClassName("modal-container").item(0).classList.remove("active");
    });

    //画像のエラー処理
    document.getElementById("mPhoto").addEventListener("error",(e)=>{
        e.target.src = "photos/noimage.jpg";
    });

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
            tochoNum ++ ;
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
    onoLib.setTbody(tbody,areaArray,);

    //百名山一覧の出力
    const yamaArray = tableData.map((value)=>{
        return [value[0],value[4],value[1],value[2],value[3],value[5],value[6]]
    })

    onoLib.setTbody(document.getElementById("yamaBody"),yamaArray,(e)=>{
        const index = tableData.findIndex((element)=>{
            return element[1]===e.target.parentElement.cols[2];
        }); 
        DispReport(index);
    });

    //攻略状況の出力
    document.getElementById("tochoNum").innerText =  tochoNum + "座";

    //登頂一覧の出力
    thoChoArray = tableData
        .filter((element)=>element[8]!== null)
        .sort((a,b)=>{
            if(a[8]*1 > b[8]*1){
                return -1;
            }else{
                return 1;
            }
            return 0;
        })
        .map((element)=>{
            return [element[8],element[6],element[1],element[2],element[3],element[4],element[5]];
        });
 
    onoLib.setTbody(document.getElementById("toChoBody"),thoChoArray,(e)=>{
        const index = tableData.findIndex((element)=>{
            return element[1]===e.target.parentElement.cols[2];
        }); 
        DispReport(index);
    });


}

function DispReport(index){
    
    document.getElementById("mName").innerText= tableData[index][1];
    document.getElementById("mYomi").innerText= tableData[index][2];
    document.getElementById("mHeight").innerText= tableData[index][3];
    document.getElementById("mArea").innerText= tableData[index][4];
    document.getElementById("mKen").innerText= tableData[index][5];
    if(tableData[index][8]!==null){
        document.getElementById("mPhoto").src= "photos/" + tableData[index][8] + ".jpg";
        document.getElementById("mDate").innerText= tableData[index][6];
        document.getElementById("mNum").innerText= `${tableData[index][8]}座目／登頂 ${tochoNum}座` ;
        document.getElementById("mReport").innerText= tableData[index][7];
    }else{
        document.getElementById("mPhoto").src= "photos/noimage.jpg";
        document.getElementById("mDate").innerText= "未登頂";
        document.getElementById("mReport").innerText= "レポートなし";
    }
    
    const container = document.getElementsByClassName("modal-container");
    container.item(0).classList.add("active");
}