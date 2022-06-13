import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import { useNavigate } from "react-router-dom";

function BookCard({ book, defaultValue }) {
  const navigate = useNavigate();
  const onSelect = (e, book) => {
    let shelf = e.target.value;
    BooksAPI.update(book, shelf).then(() => {
      navigate(0);
    });
  };
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + `${book.imageLinks.thumbnail}` + ")",
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => onSelect(e, book)}
              defaultValue={defaultValue}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.publishedDate.substring(0, 4)}</div>
        {book.authors.map((author) => {
          return (
            <div className="book-authors" key={author}>
              {author}
            </div>
          );
        })}
      </div>
    </li>
  );
}
BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
export default BookCard;
