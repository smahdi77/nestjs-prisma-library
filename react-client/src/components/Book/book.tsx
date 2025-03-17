import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./book.css";

interface BookProps {
  id: number;
  bookName: string;
  count: number;
  onDelete: (id: number) => void;
}

interface BookState {
  count: number;
}

class Book extends Component<BookProps, BookState> {
  state = {
    count: 0,
  };

  render() {
    const { id, bookName, onDelete } = this.props;
    return (
      <div>
        <span className="m-2">{bookName}</span>
        <span className="m-2">{this.state.count}</span>
        <button
          onClick={this.handleIncrement}
          className="m-2 btn btn-sm btn-success"
        >
          +
        </button>
        <button
          onClick={this.handleDecrement}
          className="m-2 btn btn-sm btn-success"
        >
          -
        </button>
        <button className="m-2 btn btn-sm btn-info">send</button>
        <button
          onClick={() => {
            onDelete(id);
          }}
          className="m-2 btn btn-sm btn-danger"
        >
          Delete
        </button>
        <img src="" style={{ borderRadius: "50%" }} alt="empty image" />
      </div>
    );
  }

  handleIncrement = () => {
    //  define count with "Object Destructuring" method
    const { count } = this.state;
    this.setState({ count: count + 1 });
  };

  handleDecrement = () => {
    const { count } = this.state;
    this.setState({ count: count - 1 });
  };
}

export default Book;
