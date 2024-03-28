/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import BlogCard from "./BlogCard";
import ProductCard from "./ProductCard";
export default function RecommendList({ text, item, type }) {
 

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const listRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - listRef.current.offsetLeft);
    setScrollLeft(listRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - listRef.current.offsetLeft;
    const walk = x - startX; // Adjust the sensitivity here
    listRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="mt-10">
      <h1 className="font-bold text-2xl ml-2 my-2">{text}</h1>
      <div
        className="overflow-x-auto no-scrollbar"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={listRef}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
          className="gap-x-4"
        >
          {item.map((items, index) => (
            <div
              key={index}
              style={{ flex: "0 0 auto", cursor: hoveredIndex === index ? "grabbing" : "grab" }}
              onMouseDown={handleMouseDown}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {type === "blog" ? (
                <BlogCard item={items} />
              ) : (
                <ProductCard item={items} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
