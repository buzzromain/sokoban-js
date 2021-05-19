function createCanvas(dimension) {
    let canvas = document.getElementById('canvas');
    canvas.width = dimension.width;
    canvas.height = dimension.height;
    var ctx = canvas.getContext('2d');
    return ctx
}

export { createCanvas };