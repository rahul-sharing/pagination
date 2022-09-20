//this is not so tough(used bootsrap and react-paginate), if you need any help go to-
// https://www.npmjs.com/package/react-paginate	

// flow of the app:
// normaly we are showing the data by fetching with useEffect.
// And when we click on any number in the pagination we are fetching data with the page number & limit inside "handlePageClick" function by calling "fetchComments" function. So simple.

import React from 'react';
import { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate"

const App = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let limit = 12; //just change the number to show how many item you wanna show in a page

  // "https://jsonplaceholder.typicode.com/comments"  - our real url. we are using it with query so that we can get the only data we need . this makes our webiste fast.
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      )
      const data = await res.json()
      const total = res.headers.get("x-total-count");   //this will give us the total num of item we have in the url.
      // console.log(total)  
      setPageCount(Math.ceil(total/limit)); // we are doing this to know how many pages do i need 
      setItems(data)
    }

    getComments();
  }, [])


  console.log(items)



  const fetchComments = async (currentPage) =>{
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  }



  const handlePageClick = async (data) => {
    console.log(data.selected)    //data.selected gives us the (current page -1);

    let currentPage = data.selected +1;
    const commentsFromServer= await fetchComments(currentPage);
    setItems(commentsFromServer);
  }

  return (
    <div className='container' >
        <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}  //no of page to disply before and after "breakLabel"
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        //classNames for styling the pagination
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName='page-link'
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakLinkClassName='page-link'
        activeClassName='active'
      />
      <div className='row m-2'>
        {items.map((item) => {
          return <div key={item.id} className='col-sm-6 col-md-4 v my-2'>
            <div className="card shaddow-sm w-100" style={{ minHeight: 225 }} >
              <div className="card-body">
                <h2 className="card-title text-center h2">ID:{item.id} </h2>
                <h6 className='card-subtitle mb-2 text-muted text-center' > {item.email}</h6>
                <p className='card-text' >{item.body}</p>
              </div>
            </div>

          </div>
        })}
      </div>
    </div>
  )
}

export default App;



