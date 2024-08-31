import React, { useState } from "react";
import axios from "axios";

const SearchPage = ({ onSelectImage }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query },
      headers: {
        Authorization: `Client-ID 0WbaTHLPbwPzqu4kEhr1-Hcm6l5ORUWXDDUmr3U8TRE`,
      },
    });
    setImages(response.data.results);
  };

  return (
    <div className="p-4">
      <div className=" flex flex-col justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="border p-2 rounded mb-5"
        />
        <button
          onClick={searchImages}
          className="bg-blue-500 text-white p-2 rounded  w-24"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="relative">
            <img
              src={image.urls.small}
              alt={image.alt_description}
              className="object-cover w-full h-full"
            />
            <button
              onClick={() => onSelectImage(image.urls.full)}
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center"
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
