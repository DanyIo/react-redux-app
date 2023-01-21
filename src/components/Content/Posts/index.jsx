import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../../features/posts/postsSlice";
import Loader from "../../Loader/loader";
import "./styles.css";
import Pagination from "./Pagination/pagination";

const Posts = () => {
  const { posts } = useSelector((store) => store.posts);
  const { status } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const [postsPerPage, setPostsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const lastPageIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPageIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPageIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="mainDiv">
        {status === "loading" && <Loader />}
        {status === "succeeded" &&
          currentPost.map((el, index) => (
            <>
              <div
                className="single_post"
                key={`${el.name}_${index}_${el.id}`}
                style={{ backgroundColor: `${el.color}` }}
              >
                {el.name}
                <br />
                Year: {el.year}
                <br />
                Color: {el.color}
              </div>
            </>
          ))}
        {status === "failed" && <p>{"Failed to load("}</p>}
      </div>
      <nav style={{ padding: 10 }}>
        {status === "succeeded" && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </nav>
    </>
  );
};

export default Posts;
