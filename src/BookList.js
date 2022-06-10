import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

function BookList() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  const getData = () => {
    BooksAPI.getAll().then((data) => {
      //console.log(data);
      Object.keys(data).forEach((key) => {
        let temp = [];
      
        if (data[key].shelf === "currentlyReading") {
          temp = currentlyReading;
          temp.push(data[key]);
          setCurrentlyReading(temp);
        } else if (data[key].shelf === "wantToRead") {
          temp = wantToRead;
          temp.push(data[key]);
          setWantToRead(temp);
        } else if (data[key].shelf === "read") {
          temp = read;          
          temp.push(data[key]);
          setRead(temp);
        }
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReading.map((book) => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                "url(" + `${book.imageLinks.thumbnail}` + ")",
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select defaultValue="currentlyReading">
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
                        <div className="book-title">
                          {book.publishedDate.substring(0, 4)}
                        </div>
                        {book.authors.map((author) => {
                          return <div className="book-authors">{author}</div>;
                        })}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToRead.map((book) => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                "url(" + `${book.imageLinks.thumbnail}` + ")",
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select defaultValue="wantToRead">
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
                        <div className="book-title">
                          {book.publishedDate.substring(0, 4)}
                        </div>
                        {book.authors.map((author) => {
                          return <div className="book-authors">{author}</div>;
                        })}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {read.map((book) => {
                  return (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                "url(" + `${book.imageLinks.thumbnail}` + ")",
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select defaultValue="read">
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
                        <div className="book-title">
                          {book.publishedDate.substring(0, 4)}
                        </div>
                        {book.authors.map((author) => {
                          return <div className="book-authors">{author}</div>;
                        })}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}
export default BookList;
