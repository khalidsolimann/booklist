import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route,Routes} from "react-router-dom"
import BookList from "./BookList.js"
import BookSearch from "./BookSearch.js"

function BooksApp() {

    return (
      <div className="app">
      	<Routes>
      		<Route exact path="/" element={<BookList/>} /> 
			<Route exact path="/search" element={<BookSearch/>} /> 
      	</Routes>
      </div>
    )
}

export default BooksApp
