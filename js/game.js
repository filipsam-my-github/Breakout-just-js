import * as mo_Player from './player.js'
import * as mo_Ball from './ball.js'
import * as mo_Brick from './bricks.js'
import * as mo_Globals from './game_global_varables.js'


export class Game{
    constructor(starting_game_state) {
        this.game_states = {
            gameplay: new Gameplay(),
            menu: new Menu()
        }
        
        mo_Globals.current_game_state.state = starting_game_state
        this.last_state = mo_Globals.current_game_state.state
        this.game_states[mo_Globals.current_game_state.state].loadToHtml() 
    }

    changeGameState() {
        this.game_states[this.last_state].destructor()

        this.game_states = {
            gameplay: new Gameplay(),
            menu:new Menu()
        }

        this.game_states[mo_Globals.current_game_state.state].loadToHtml() 

    }

    gameLoop(){
        if (this.last_state != mo_Globals.current_game_state.state){
            this.changeGameState()
        }
        this.last_state = mo_Globals.current_game_state.state

        this.game_states[mo_Globals.current_game_state.state].gameLoop()

    }
}


export class Menu{
    constructor() {
        
    }


    loadToHtml(){
        const container = document.querySelector('.game-container');

        const menu = document.createElement('div');
        menu.classList.add('menu');

        const message = document.createElement('p');
        message.textContent = 'Press space to start';

        menu.appendChild(message);

        container.appendChild(menu);
    }

    checkIfGameOver(){
        if (mo_Globals.keys[" "]){
            mo_Globals.current_game_state.state = "gameplay"
        }
    }

    gameLoop() {
        this.checkIfGameOver()
    }

    destructor(){
        const container = document.querySelector('.game-container');
        const divs = container.querySelectorAll('div');
        divs.forEach(div => div.remove());
    }
}

class Gameplay{
    constructor() {
        this.player = new mo_Player.Player(58)
        this.ball = new mo_Ball.Ball(52)
        this.bricks = mo_Brick.generateBricksList()

        this.current_time = performance.now()
        this.last_time = performance.now()
    }

    loadToHtml(){
        const container = document.querySelector('.game-container');

        container.appendChild(this.player.display);
        container.appendChild(this.ball.display);

        for (let brick of this.bricks){
            container.appendChild(brick.display);
        }
    }

    destructor(){
        const container = document.querySelector('.game-container');
        const divs = container.querySelectorAll('div');
        divs.forEach(div => div.remove());
    }

    getDeltaTime(){
        this.current_time = performance.now()
        let dt = (this.current_time - this.last_time) / 1000
        this.last_time = this.current_time

        return dt
    }

    checkIfGameOver(){
        if (this.ball.have_touched_bottom || this.bricks.length === 0){
            mo_Globals.current_game_state.state = "menu"
        }
    }
    
    gameLoop(){
        let dt = this.getDeltaTime()
        
        this.player.move(mo_Globals.keys, dt)
        this.ball.move(dt, this.player, ...this.bricks)
        {
            let indexs_to_delet = []
            {
                let i = 0
                for (let brick of this.bricks){
                    brick.tick()
                    if (brick.has_been_hitted){
                        indexs_to_delet.push(i)
                    }            
                    i++
                }
            }
            {
                let deleted_counter = 0
                for (let i of indexs_to_delet){
                    this.bricks.splice(i, 1);
                    deleted_counter++
                }   
            }
        }

        this.checkIfGameOver()
    }



}