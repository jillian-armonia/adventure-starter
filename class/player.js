const {Food} = require('./food')

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        let roomItems = this.currentRoom.items;

        for (const roomItem of roomItems){
            let itemIndex = roomItems.indexOf(roomItem)
            if (itemName === roomItem.name){
                this.items.push(roomItem);
                roomItems.splice(itemIndex, 1);
            }
        }

    }

    dropItem(itemName) {
        let inventory = this.items;

        for (const playerItem of inventory){
            let itemIndex = inventory.indexOf(playerItem)
            if (itemName === playerItem.name){
                this.currentRoom.items.push(playerItem);
                inventory.splice(itemIndex, 1);
            }
        }
    }

    eatItem(itemName) {
       let inventory = this.items

       for (const playerItem of inventory){
        let itemIndex = inventory.indexOf(playerItem)

        if (playerItem instanceof Food && playerItem.name === itemName){
            inventory.splice(itemIndex, 1)
        }
       }
    }

    getItemByName(name) {
        for (const item of this.items){
            if (name === item.name){
                return item;
            }
        }
    }
}

module.exports = {
  Player,
};
