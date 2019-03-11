import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ======= COMPONENTS ========

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i){
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
            return (
                <div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                        {this.renderSquare(3)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(8)}
                        {this.renderSquare(9)}
                        {this.renderSquare(10)}
                        {this.renderSquare(11)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(12)}
                        {this.renderSquare(13)}
                        {this.renderSquare(14)}
                        {this.renderSquare(15)}
                    </div>
                </div>
            );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board1: [
                ['X'], ['O'], ['O'], ['O'],
                ['X'], ['O'], ['O'], ['O'],
                ['X'], ['O'], ['X'], ['X'],
                ['O'], ['O'], ['O'], ['O'],
            ],
            board2: [
                ['X'], ['O'], ['X'], ['O'],
                ['O'], ['O'], ['O'], ['O'],
                ['X'], ['O'], ['O'], ['X'],
                ['X'], ['O'], ['O'], ['O'],
            ],
            whoIsNext: true,
            getInitialState: 'First',
            squares1: Array(16).fill(null),
            squares2: Array(16).fill(null),
            count1: 0,
            count2: 0,
        };

        this.handleClickGame = this.handleClickGame.bind(this);
    }


    handleClick(i) {
        if(this.state.getInitialState === 'First'){
            const squares1 = Array(16).fill(null);
            for (let j = 0; j < this.state.squares1.length; j++) {
                if (j === i) {
                    // debugger;
                    squares1[j] = this.state.board1[i];
                    if(squares1[j][0] === 'X')
                        this.setState({
                            count1: this.state.count1 + 1,
                        });
                } else
                    squares1[j] = this.state.squares1[j];
            }
            this.setState({
                squares1: squares1,
            });
            this.handleClickGame();
        }
        else if(this.state.getInitialState === 'Second'){
            const squares2 = Array(16).fill(null);
            for (let j = 0; j < this.state.squares2.length; j++) {
                if (j === i) {
                    squares2[j] = this.state.board2[i];
                    if(squares2[j][0] === 'X')
                        this.setState({
                            count2: this.state.count2 + 1,
                        });
                } else
                    squares2[j] = this.state.squares2[j];
            }
            this.handleClickGame();
            this.setState({
                squares2: squares2,
            });
        }

    }


    handleClickGame() {
        let newActive = this.state.getInitialState === 'First' ? 'Second' : 'First';
        this.setState({ getInitialState: newActive });
    }


    render() {
        let active = this.state.getInitialState;
        if(this.state.count1 === 5) {
            return(
                <div>
                    <h1>The winner is Player1! </h1>
                </div>
            );
        }
        else
        if(this.state.count2 === 5) {
            return(
                <div>
                    <h1>The winner is Player2! </h1>
                </div>
            );
        }
        else
            return (
            <div>
                {active === 'First' ? (
                    <div className="game">
                        <h2 className="player">Player1</h2>
                        <div className="game-board">
                            <Board squares={this.state.squares1}
                                   onClick={(i) => this.handleClick(i)}/>
                        </div>
                    </div>

                ) : active === 'Second' ? (
                    <div className="game">
                        <h2 className="player">Player2</h2>
                        <div className="game-board">
                            <Board squares={this.state.squares2}
                                   onClick={(i) => this.handleClick(i)}/>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
// ======= ReactDOM ========
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

