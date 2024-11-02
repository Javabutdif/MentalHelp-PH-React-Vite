import React from "react";
import { Link, useLocation } from "react-router-dom";

const ForumList = ({ forums, onForumClick }) => {
  const location = useLocation();

  const path = location.pathname.split("/");
  const lastpath = path[path.length - 2];
  const wallpapers = [
    "/wallpaper1.jpg",
    "/wallpaper3.jpg",
    "/wallpaper4.jpg",
    "/wallpaper5.jpg",
  ];

  const getRandomWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  };
  console.log(forums);
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {forums.map((forum, index) => (
          <Link
            to={`${location.pathname}/discussion/${forum.forum_id}`}
            key={forum.forum_id}
          >
            <div
              className="p-4 rounded shadow-md bg-white bg-opacity-80 hover:bg-opacity-20"
              style={{
                backgroundImage: `url(${getRandomWallpaper()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <button className="cursor-pointer text-white">
                {forum.title}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumList;
