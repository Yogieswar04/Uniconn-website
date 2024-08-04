import React, { useEffect, useState } from "react";
import CollegeCard from "../../components/CollegeCard";

const AllColleges = () => {
  const [page, setPage] = useState(0);
  const [colleges, setColleges] = useState([]);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch(
          `${process.env.VITE_BACKEND_URL}/api/v1/colleges?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        setColleges(data?.colleges);
        setTotal(data.TotalCount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchColleges();
  }, [page, limit]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      (prevPage + 1) * limit < total ? prevPage + 1 : prevPage
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-1">
        <div className="flex flex-wrap items-center justify-center gap-10 p-10">
          {colleges?.map((college) => {
            return (
              <CollegeCard
                key={college._id} // Assuming each college has a unique _id
                name={college.name}
                place={college.place}
                image={college.image}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between p-10">
        <button
          className={`p-3 text-black border ${
            page === 0
              ? "bg-red-100 border-red-500 cursor-not-allowed"
              : "bg-gray-100 border-gray-200"
          }`}
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          Prev
        </button>
        <button
          className={`p-3 text-black border ${
            (page + 1) * limit >= total
              ? "bg-red-100 border-red-500 cursor-not-allowed"
              : "bg-gray-100 border-gray-200"
          }`}
          onClick={handleNextPage}
          disabled={(page + 1) * limit >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllColleges;
