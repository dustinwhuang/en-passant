import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 'undefined'
    }

    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  createGame() {
    return fetch('/games?id=undefined', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(game => this.props.history.push(`/${game.id}`));
  }

  handleInputChange(e) {
    this.setState({id: e.target.value});
  }

  joinGame(e) {
    e.preventDefault();
    this.props.history.push(`/${this.state.id}`);
  }

  render() {
    return (
      <div>
        <h1>en passant</h1>
        <div className="options">
          <div className="create">
            <button id="new-game" onClick={this.createGame}>New Game</button>
          </div>
          <div className="join">
            <form>
              <input type="text" id="game-id" onChange={e => this.handleInputChange(e)} />
              <input type="submit" id="join-game" value="Join Game" onClick={e => this.joinGame(e)} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home