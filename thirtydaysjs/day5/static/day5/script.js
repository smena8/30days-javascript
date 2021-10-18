const display = document.querySelector('#display')
const hex = document.querySelector('#color_hex')
const rgb = document.querySelector('#color_rgb')
const cmyk = document.querySelector('#color_cmyk')
const button = document.querySelector('button')


window.onload = addColors();

button.addEventListener('click', addColors)

function generateHEX(){
    const hex_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

    let hexStr = '#';

    for (i=0; i < 6; i++){
        hexStr += hex_array[Math.floor(Math.random()*hex_array.length)]
    }

    return hexStr
}

// assumes hex is 6 and not a shortcut (ex., #ffffff vs. #fff)
function hex2RGB(hexStr){
    // start at 1 to skip hash symbol in string
    let red = parseInt(hexStr.substring(1,3), 16)
    let green = parseInt(hexStr.substring(3,5), 16)
    let blue = parseInt(hexStr.substring(5,7), 16)

    rgbStr = '('+red+', '+green+', '+blue+')'

    return rgbStr
}

// assumes hex is 6 and not a shortcut
function hex2CMYK(hexStr){
}

function addColors(){
    hexStr = generateHEX();
    hex.innerHTML = 'HEX ' + hexStr
    document.body.style.background = hexStr

    rgbStr = hex2RGB(hexStr);
    rgb.innerHTML = 'RGB ' + rgbStr
}