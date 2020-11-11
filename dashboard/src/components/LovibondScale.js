let scale = [
    "rgb(250, 250, 188)",
    "rgb(250, 250, 160)",
    "rgb(250, 250, 133)",
    "rgb(250, 250, 105)",
    "rgb(250, 250, 78)",
    "rgb(245, 246, 50)",
    "rgb(240, 238, 46)",
    "rgb(235, 228, 47)",
    "rgb(230, 218, 48)",
    "rgb(225, 208, 50)",
    "rgb(220, 198, 51)",
    "rgb(215, 188, 52)",
    "rgb(209, 176, 54)",
    "rgb(204, 166, 55)",
    "rgb(200, 156, 56)",
    "rgb(197, 146, 56)",
    "rgb(195, 139, 56)",
    "rgb(192, 136, 56)",
    "rgb(192, 132, 56)",
    "rgb(192, 128, 56)",
    "rgb(192, 124, 56)",
    "rgb(192, 120, 56)",
    "rgb(192, 116, 56)",
    "rgb(192, 112, 56)",
    "rgb(192, 109, 56)",
    "rgb(188, 105, 56)",
    "rgb(183, 101, 56)",
    "rgb(178, 97, 56)",
    "rgb(171, 94, 55)",
    "rgb(164, 90, 53)",
    "rgb(157, 86, 52)",
    "rgb(149, 82, 51)",
    "rgb(141, 77, 49)",
    "rgb(134, 73, 46)",
    "rgb(127, 69, 43)",
    "rgb(119, 66, 39)",
    "rgb(112, 62, 36)",
    "rgb(105, 58, 31)",
    "rgb(98, 54, 25)",
    "rgb(91, 51, 19)",
    "rgb(84, 47, 13)",
    "rgb(77, 43, 8)",
    "rgb(69, 39, 11)",
    "rgb(62, 36, 13)",
    "rgb(54, 31, 16)",
    "rgb(47, 27, 19)",
    "rgb(39, 24, 21)",
    "rgb(36, 21, 20)",
    "rgb(33, 20, 19)",
    "rgb(31, 18, 17)",
    "rgb(28, 16, 15)",
    "rgb(28, 15, 14)",
    "rgb(23, 13, 12)",
    "rgb(21, 11, 10)",
    "rgb(18, 10, 9)",
    "rgb(16, 8, 7)",
    "rgb(13, 6, 5)",
    "rgb(11, 5, 4)",
    "rgb(9, 3, 2)",
    "rgb(6, 2, 1)"
];

/*
const LtoRGB = (L) => {
    // Fuente: http://hbd.org/hbd/archive/3234.html#3234-14
    const clamp = (v) => {
        if(v < 0) return 0;
        else if(v > 255) return 255;
        else return Math.round(v);
    }

    let S = 1.3546*L-0.76;
    let Y = 94.6914*Math.exp(-0.131272*S);
    let x = 0.73978 - 0.25442*Math.exp(-0.037865*S) - 0.017511*Math.exp(-0.24307*S);
    let y = 0.197785 + 0.260472*Math.exp(-((x-0.491021)/.214194)*((x-0.491021)/.214194));
    let z = 1 - x - y;
    let W = Y/y;
    let X = W*x;
    let Z = W*z;
    let R = clamp(1.910*X - 0.533*Y - 0.288*Z);
    let G = clamp(-0.985*X + 2.000*Y - 0.0280*Z);
    let B = clamp(0.058*X - 0.118*Y + 0.896*Z);

    let rgb = "rgb("+R+","+G+","+B+")";
    console.log(rgb);
    return rgb;
}
*/

const LtoColor = (L) => {
    let EBC = Math.round(2.666*L-1.49);
    if(EBC < 0) EBC = 0;
    if(EBC > 59) EBC = 59;    
    return {backgroundColor:scale[EBC], color: EBC>30?"white":"black"};
}

export default LtoColor;