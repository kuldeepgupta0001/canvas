import React, { useState } from "react";
import SearchPage from "./component/SearchPage";
import CanvasEditor from "./component/CanvasEditor";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container mx-auto p-4">
      {!selectedImage ? (
        <SearchPage onSelectImage={setSelectedImage} />
      ) : (
        <CanvasEditor imageUrl={selectedImage} />
      )}
    </div>
  );
};

export default App;
