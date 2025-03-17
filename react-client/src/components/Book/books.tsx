import { Component } from "react";
import Book from "./book";

class Books extends Component {
  state = {
    books: [
      { id: 1, count: 2, bookName: "AzadiManavi" },
      { id: 2, count: 5, bookName: "TarhKolli" },
      { id: 3, count: 3, bookName: "Haifa" },
    ],
  };

  handleDelete = (id: number) => {
    console.log(id);
  };

  render() {
    return (
      <>
        {this.state.books.map((b, index) => (
          <Book
            key={index}
            id={b.id}
            bookName={b.bookName}
            count={b.count}
            onDelete={this.handleDelete}
          />
        ))}
      </>
    );
  }
}

export default Books;
