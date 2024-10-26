import React from "react";

const ForumList = ({ forums, onForumClick }) => {
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

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {forums.map((forum, index) => {
          return (
            <div
              key={index}
              className="p-4 rounded shadow-md bg-white bg-opacity-80 hover:bg-opacity-20"
              style={{
                backgroundImage: `url(${getRandomWallpaper()})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => onForumClick(forum)}
            >
              <button className="cursor-pointer text-white">
                {forum.title}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForumList;
