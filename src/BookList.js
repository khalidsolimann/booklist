import React, { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

function BookList() {
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);

  const getData = () => {
    BooksAPI.getAll().then((data) => {
      Object.keys(data).forEach((key) => {
        let temp = [];
        if (data[key].shelf === "currentlyReading") {
          temp = currentlyReading;
          temp.push(data[key]);
          setCurrentlyReading([...temp]);
        } else if (data[key].shelf === "wantToRead") {
          temp = wantToRead;
          temp.push(data[key]);
          setWantToRead([...temp]);
        } else if (data[key].shelf === "read") {
          temp = read;
          temp.push(data[key]);
          setRead([...temp]);
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
                    <BookCard
                      key={book.id}
                      book={book}
                      defaultValue={"currenlyReading"}
                    />
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
                    <BookCard
                      key={book.id}
                      book={book}
                      defaultValue={"wantToRead"}
                    />
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
                    <BookCard key={book.id} book={book} defaultValue={"read"} />
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
