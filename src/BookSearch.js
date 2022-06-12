import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export default function BookSearch() {
  const [books, setBooks] = useState([]);

  const getData = (input) => {
    if (input != "") {
      BooksAPI.search(input, 20).then((data) => {
        if (data.error == "empty query") {
          return setBooks([]);
        }

        setBooks(data);
      });
    } else setBooks([]);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => getData(e.target.value)}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books &&
            books.map((book) => {
              console.log(book.imageLinks);
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          background: book.imageLinks
                            ? `url(${book.imageLinks.thumbnail})`
                            : "none",
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          // onChange={(e) => onSelect(e, book)}
                          defaultValue="none"
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors && book.authors.join()}
                    </div>
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
