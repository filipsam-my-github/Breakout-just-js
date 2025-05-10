import * as mo_Entity from './entity.js'
import * as mo_Util from './util.js'
import * as mo_Globals from './game_global_varables.js'

export class Brick extends mo_Entity.Entity{
    constructor(x_coord, y_coord, width, height){
        const type_of_entity = "brick"


        super(x_coord, y_coord, width, height, type_of_entity);
        this.has_been_hitted = false

        this.display.style.backgroundColor = `rgb(${mo_Util.randint(100,255)},${mo_Util.randint(100,255)},${mo_Util.randint(100,255)})`

    }

    tick(){
        if (this.has_been_hitted){
            this.destructor()
            this.has_been_hitted = true
        }
    }

    
}



export function generateBricksList(){
    let bricks = []

    for (let i = 0; i < mo_Util.randint(4,10); i++){

        let number_of_bricks_in_the_row = mo_Util.randint(7,12)

        let margin = Math.floor(mo_Util.randint(0, 
            mo_Globals.world_width%number_of_bricks_in_the_row
        ))
        
        let x_vector = Math.floor((mo_Globals.world_width - margin)/number_of_bricks_in_the_row)


        for (let j = 0; j < number_of_bricks_in_the_row; j++){
            let width = mo_Util.randint(3, x_vector - 1)
            

            bricks.push(
                new Brick(j*x_vector + margin, i*5 + 3, width, mo_Util.randint(2,3))   
            )
        }

    }

    return bricks
}
