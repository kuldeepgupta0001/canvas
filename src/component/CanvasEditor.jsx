import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  console.log(imageUrl);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
    setFabricCanvas(canvas);

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        if (img) {
          img.scaleToWidth(canvas.width);

          canvas.add(img);

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

          canvas.renderAll();
        } else {
          console.error("Failed to load the image.");
        }
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [imageUrl]);

  const addText = () => {
    if (fabricCanvas) {
      const text = new fabric.IText("Edit me", {
        left: 50,
        top: 50,
        fontSize: 30,
      });
      fabricCanvas.add(text);
    }
  };

  const addShape = (shapeType) => {
    if (fabricCanvas) {
      let shape;
      switch (shapeType) {
        case "circle":
          shape = new fabric.Circle({
            radius: 50,
            fill: "blue",
            left: 100,
            top: 100,
          });
          break;
        case "rectangle":
          shape = new fabric.Rect({
            width: 100,
            height: 50,
            fill: "green",
            left: 150,
            top: 150,
          });
          break;
        case "triangle":
          shape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: "red",
            left: 200,
            top: 200,
          });
          break;
        default:
          return;
      }
      fabricCanvas.add(shape);
    }
  };

  const downloadImage = () => {
    if (fabricCanvas) {
      const link = document.createElement("a");
      link.href = fabricCanvas.toDataURL({ format: "png" });
      link.download = "edited-image.png";
      link.click();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="800" height="600" className="border" />
      <div className="mt-4">
        <button
          onClick={addText}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Text
        </button>
        <button
          onClick={() => addShape("circle")}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape("rectangle")}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Rectangle
        </button>
        <button
          onClick={() => addShape("triangle")}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Triangle
        </button>
        <button
          onClick={downloadImage}
          className="bg-green-500 text-white p-2 rounded"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CanvasEditor;
