'use strict'
// 1行目に記載している 'use strict' は削除しないでください

window.onload=()=>{
    document.getElementById("button").addEventListener("click",xlsxRead);
    document.getElementById("copy").addEventListener("click",()=>{
        navigator.clipboard.writeText(document.getElementById("textarea").value);
    });
}

const xlsxRead = ()=>{
    const file = document.getElementById("file");
    const message = document.getElementById("message");
    const textarea = document.getElementById("textarea");
    message.innerText = "";
    textarea.value = "";
    if(file.files.length > 0){
        const reader = new FileReader();
        reader.onload = (e)=>{
            const unit8 = new Uint8Array(e.target.result);
            const workbook = XLSX.read(unit8, {type: "array"});
            const sheetName = "百名山";
            if(sheetName in workbook.Sheets){
                const sheet = workbook.Sheets[sheetName];
                const cols = "ABCDEFGHI".split("");
                const array = [];
                for( let i = 2 ; i <= 101 ; i ++){
                    const line = [];
                    for( let j = 0 ; j < cols.length ; j++ ){
                        if(sheet[cols[j] + i]){
                            line.push(sheet[cols[j] + i].w);
                        }else{
                            line.push(null);
                        }
                    }
                    array.push(line);
                }
                textarea.value = JSON.stringify(array,null,3);
                message.innerText = "抽出結果を出力しました。";
            }else{
                message.innerText = "「百名山」シートが見つかりません";
            }

        }
        reader.readAsArrayBuffer(file.files[0]);
    }else{
        message.innerText = "ファイルが選択されてません";
    }
}