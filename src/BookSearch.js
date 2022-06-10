import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

export default function BookSearch() {
  const [books, setBooks] = useState([]);

  const getData = (input) => {
    if (input != "") {
      BooksAPI.search(input, 20).then((data) => {
        console.log(data);
        if (data.error == "empty query") setBooks([]);
        else {
          setBooks(data);
        }
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
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
            books.map((key) => {
              let url, shelf, publishedDate, authors;
              try {
                url = books[key].imageLinks;
              } catch (e) {
                url = "null";
              }
              try {
                shelf = books[key].shelf;
              } catch (e) {
                shelf = "none";
              }
              try {
                publishedDate = books[key].publishedDate.substring(0, 4);
              } catch (e) {
                publishedDate = "";
              }
              try {
                authors = books[key].authors;
              } catch (e) {
                authors = [];
              }
              console.log(url, shelf, authors, publishedDate);
              return (
                <li key={key}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,

                          backgroundImage: url,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          // onChange={(e) => onSelect(e, book)}
                          defaultValue={shelf}
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
                    <div className="book-title">{publishedDate}</div>
                    {authors.map((author) => {
                      return (
                        <div className="book-authors" key={author}>
                          {author}
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}
