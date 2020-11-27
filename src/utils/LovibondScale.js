let colorMap = [
    [250, 250, 188],
    [250, 250, 160],
    [250, 250, 133],
    [250, 250, 105],
    [250, 250, 78],
    [245, 246, 50],
    [240, 238, 46],
    [235, 228, 47],
    [230, 218, 48],
    [225, 208, 50],
    [220, 198, 51],
    [215, 188, 52],
    [209, 176, 54],
    [204, 166, 55],
    [200, 156, 56],
    [197, 146, 56],
    [195, 139, 56],
    [192, 136, 56],
    [192, 132, 56],
    [192, 128, 56],
    [192, 124, 56],
    [192, 120, 56],
    [192, 116, 56],
    [192, 112, 56],
    [192, 109, 56],
    [188, 105, 56],
    [183, 101, 56],
    [178, 97, 56],
    [171, 94, 55],
    [164, 90, 53],
    [157, 86, 52],
    [149, 82, 51],
    [141, 77, 49],
    [134, 73, 46],
    [127, 69, 43],
    [119, 66, 39],
    [112, 62, 36],
    [105, 58, 31],
    [98, 54, 25],
    [91, 51, 19],
    [84, 47, 13],
    [77, 43, 8],
    [69, 39, 11],
    [62, 36, 13],
    [54, 31, 16],
    [47, 27, 19],
    [39, 24, 21],
    [36, 21, 20],
    [33, 20, 19],
    [31, 18, 17],
    [28, 16, 15],
    [28, 15, 14],
    [23, 13, 12],
    [21, 11, 10],
    [18, 10, 9],
    [16, 8, 7],
    [13, 6, 5],
    [11, 5, 4],
    [9, 3, 2],
    [6, 2, 1]
];

const LtoRGB = (L) => { // Mapeo L -> RGB
    if(L){
        let EBC = Math.round(2.666*parseFloat(L)-1.49);
        if(EBC < 0) EBC = 0;
        if(EBC > 59) EBC = 59;    
        return colorMap[EBC];
    }else{
        return [255,255,255];
    }
}

const LtoTextColor = (L) => {
    let rgb = LtoRGB(L);    
    return { // Formato objeto estilo ReactJS
        backgroundColor: "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")", 
        color: L>13?"white":"black"
    };    
}

export {LtoRGB, LtoTextColor};