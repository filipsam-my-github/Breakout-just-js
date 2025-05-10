import * as mo_Player from './player.js'
import * as mo_Ball from './ball.js'
import * as mo_Brick from './bricks.js'
import * as mo_Globals from './game_global_varables.js'
import * as mo_Game from './game.js'



window.addEventListener('keydown', function (event) {
    mo_Globals.keys[event.key] = true
    console.log(event.key)
});

window.addEventListener('keyup', function (event) {
    mo_Globals.keys[event.key] = false
});

let g_game = new mo_Game.Game("menu")


function gameLoop(){
    g_game.gameLoop()

    requestAnimationFrame(gameLoop);
}




requestAnimationFrame(gameLoop)