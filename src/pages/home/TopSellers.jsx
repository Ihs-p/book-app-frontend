import React, { useEffect, useState } from "react";
import BookCard from "../books/BookCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/feature/books/booksApi";

const TopSellers = () => {
  const categories = [
    "choose a genre",
    "Bussiness",
    "Fiction",
    "Horror",
    "Adventure",
  ];
  const [selectedCategory, setSelectedCategory] = useState("choose a genre");

  const { data:books = [], error, isLoading } = useFetchAllBooksQuery();

  // useEffect(() => {
  //   if (isLoading) {
  //     console.log("Loading books...");
  //   } else if (error) {
  //     console.error("Error fetching books:", error);
  //   } else {
  //     console.log("Fetched books:", books);
  //   }
  // }, [books, error, isLoading]);

  // const  [loading, setLoading] = useState(false);

  const filteredBooks =
    selectedCategory === "choose a genre"
      ? books
      : books.filter((book) => book.category == selectedCategory.toLowerCase());

  return (
    <>
      {isLoading && <p>Loading books...</p>}
      {error && <p>Error loading books. Please try again later.</p>}
      <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
        {/* category filtering */}
        <div className="mb-8  flex items-center">
          <select
            name="" 
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.length > 0 &&
            filteredBooks?.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default TopSellers;
