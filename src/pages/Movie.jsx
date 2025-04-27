import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { list } from "@/api/movies"
import Card from "@/components/Card";
import { Loader2 } from "lucide-react";

export default function Movie() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
 
  // Fetch data from API
  const fetchData = async (search, page) => {
    try {
      setIsLoading(true);
      const res = await list(search, page);
      setIsLoading(false);
      setMovies(res.data.results); // Set the fetched data
      setCurrentPage(res.data.page);
      setTotalPage(res.data.total_pages);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      fetchData(search, 1);
    }, 1000); // รอ 1 วินาที (1000ms)

    return () => clearTimeout(delayDebounce); // เคลียร์ถ้ามีการพิมพ์ใหม่
  }, [search]);

  const handleAddMovie = () => {
    if (!title.trim() || !price.trim()) return;
    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      price: parseFloat(price),
    };
    setMovies((prev) => [...prev, newMovie]);
    setTitle("");
    setPrice("");
  };

  const handlePrevPage = () => {
    const page = Math.max(currentPage - 1, 1);
    fetchData(search, page);
  };

  const handleNextPage = () => {
    const page = Math.max(currentPage + 1, 1);
     fetchData(search, page);
  };
  return (
    <div className="w-[80%] mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-red-600 text-center mb-8">
        🎬 Movie List
      </h1>

      {/* Search */}
      <div className="max-w-4xl mx-auto mb-6">
        <Input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-red-500" />
        </div>
      ) : (
        <>
          <div className="grid  sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>

          {movies.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              No movies found.
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPage}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPage}
                className="px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
