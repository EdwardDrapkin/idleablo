import IdleabloComponent from 'components/IdleabloComponent.js';
import React from 'react';

export default class GridDungeon extends IdleabloComponent {
    constructor(props, context) {
        super(props, context);

        console.log(props);

        this.grid = GridDungeon._initGrid(this.props.mapX, this.props.mapY, '0');

    }

    static _initGrid(x, y, defaultValue = false) {
        let grid = [];

        for(var i = 0; i < x; i++) {
            grid[i] = [];

            for(var ii = 0; ii < y; ii++) {
                grid[i][ii] = defaultValue;
            }
        }

        return grid;
    }

    render() {
        var room = Room.createRoom(50, 50);
        return <div>

            <GridRenderer
                grid={this.grid}
                height={this.props.mapY}
                width={this.props.mapX}
            />

            <br/>

            <GridRenderer
                grid={room.grid}
                width={room.width}
                height={room.height}
                />

        </div>;
    }
}

class GridRenderer extends React.Component {
    render() {
        let elements = [];

        for(let y = 0; y < this.props.height; y++) {
            for(let x = 0; x < this.props.width; x++) {
                elements.push(<span key={x + "_"+y}>{this.props.grid[x][y]}</span>);
            }

            elements.push(<br key={"br" + y} />);
        }

        return <div>{elements}</div>
    }
}

GridRenderer.propTypes = {
    grid: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};

class Room {
    static createRoom(maxX, maxY) {
        let min = 8;
        let sizeX = Math.floor(Math.random() * (maxX + 1 - min)) + min;
        let sizeY = Math.floor(Math.random() * (maxY + 1 - min)) + min;

        return new Room(sizeX, sizeY);
    }

    static _makeDoors(width, height) {
        let doors = [
            [Math.floor(Math.random() * (width - 2)) + 1, 0], //north
            [Math.floor(Math.random() * (width - 2)) + 1, height - 1], //south
            [width-1,Math.floor(Math.random() * (height - 2)) + 1], //east
            [0,Math.floor(Math.random() * (height - 2)) + 1] //west
        ];

        return doors;
    }

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.grid = GridDungeon._initGrid(width, height, 'R');

        for(let x = 0; x < this.height; x++) {

        }

        this.doors = Room._makeDoors(width, height);

        for(let door of this.doors) {
            this.grid[door[0]][door[1]] = 'D';
        }
    }

}

GridDungeon.propTypes = {
    roomXMax: React.PropTypes.number.isRequired,
    roomYMax: React.PropTypes.number.isRequired,
    mapX: React.PropTypes.number.isRequired,
    mapY: React.PropTypes.number.isRequired
};