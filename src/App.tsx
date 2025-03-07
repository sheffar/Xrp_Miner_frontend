import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const array = [1, 2, 3]

  const fetchData = async () => {
    try {
      setLoading(true)

      const req = await fetch("https://xrp-miner-6os7.onrender.com/keep-alive");
      const textResponse = await req.text(); // Read response as text first

  
      console.log("Parsed JSON:", textResponse);
      if (req.ok) {
        setData(textResponse)
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  };



  useEffect(() => {
    fetchData()
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">API Data</h1>
      {loading && <p className="text-gray-700">Loading...</p>}
      {error !== "" && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <p className="bg-white p-4 rounded-lg shadow-md w-full max-w-full ">
          {JSON.stringify(data, null, 2)}
        </p>
      )}

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 flex justify-around sm:hidden">
        {array.map((_, i) => (
          <Link key={i} to={''}> <FaHome /> </Link>
        ))}
      </nav>
    </div>
  );
}
