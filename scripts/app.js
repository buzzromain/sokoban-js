import { playGame } from './play_game.js'
import { readLevelFile } from './utils.js' 

document.addEventListener('win', function() {
    const winTextElm = document.createElement('span');
    winTextElm.id = "win-text"
    winTextElm.innerText = "YOU WIN !";
    
    const app = document.getElementById('app');
    document.body.appendChild(winTextElm);
    console.log("gagné !")
})

document.querySelectorAll('.level-button').forEach(item => {
    item.addEventListener('click', async event => {
        const levelContent = await readLevelFile('levels/' + item.getAttribute('value') + '.xsb');
        playGame(levelContent);
    })
})

document.getElementById('level-file').addEventListener('change', event => {
    var selectedFile = document.getElementById('level-file').files[0];
    var reader = new FileReader();
    reader.onload = function(event) { playGame(reader.result); };
    reader.readAsText(selectedFile);
})

window.onload = function() {
    document.getElementById('level-file-form').reset();
}