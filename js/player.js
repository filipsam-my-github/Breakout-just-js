import * as mo_Entity from './entity.js'
import * as mo_Globals from './game_global_varables.js'

export class Player extends mo_Entity.Entity{
    constructor(y_coord){
        const width = 6;
        const x_coord = (60 - width) / 2;
        const height = 1;
        const type_of_entity = "player";

        super(x_coord, y_coord, width, height, type_of_entity);
        this.player_speed = 60

    }

    interactWhitBorder(){
        if (mo_Globals.world_width < this.rect.width + this.rect.x){
            this.rect.x = mo_Globals.world_width - this.rect.width
        }

        if (this.rect.x < 0){
            this.rect.x = 0
        }

        if (mo_Globals.world_height < this.rect.height + this.rect.y){
            this.rect.y = mo_Globals.world_width - this.rect.height
        }

        if (this.rect.y < 0){
            this.rect.y = 0
        }

    }

    changePosition(x_axis, y_axis) {
        this.rect.x += x_axis
        this.rect.y += y_axis

        this.interactWhitBorder()


        this.display.style.left = `${this.rect.x}vh`;
        this.display.style.top = `${this.rect.y}vh`;
    }

    move(keys, dt) {
        const movment_vector = this.player_speed * dt


        if (keys["d"] || keys["ArrowReft"]) {
            this.changePosition(this.player_speed * dt, 0)
        }

        if (keys["a"] || keys["ArrowLeft"]) {
            this.changePosition(-this.player_speed * dt, 0)
        }
    }
}
