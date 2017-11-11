import React from 'react'

class SquareView extends React.Component {
  constructor(props) {
    super(props);

  }

  getBackgroundColor(style, squareId, row) {
    if (style === '@') {
      return {backgroundColor: 'pink'};
    } else if ((squareId.charCodeAt() + row) % 2 === 0) {
      return {backgroundColor: 'lightGrey'};
    } else {
      return {backgroundColor: 'white'};
    }
  }

  render() {
    return (
      <td
        className={`${this.props.squareId}${this.props.rowId}`}
        style={this.getBackgroundColor(this.props.style, this.props.squareId, this.props.rowId)}
        onClick={() => this.props.handleSquareClick({col: this.props.squareId, row: this.props.rowId})}
      >
        <img
          src={this.props.square !== '' ? `images/${this.props.square}.png` : ""}
          alt={this.props.square}
          height="40"
          width="40"
        />
      </td>
    )
  }
}
export default SquareView