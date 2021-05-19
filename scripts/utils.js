export const maxWidth = (arr) => {
    let maxSize = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].length > maxSize) {
            maxSize = arr[i].length
        }
    } 
    return maxSize;
}

export const maxHeight = (arr) => {
    return arr.length;
}

export const getCanvasDimension = (arr) => {
    return {
        width: maxWidth(arr) * 34,
        height: maxHeight(arr) * 34
    }
}

export const loadSprite = filepath => {
    let img = new Image();
    img.src = filepath;
    return img;
}

export const readLevelFile = async filepath => {
    const response = await fetch(filepath)
    const text = await response.text()
    return text;
}