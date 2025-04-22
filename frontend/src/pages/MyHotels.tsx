import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
 

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (!hotelData || hotelData.length===0) {
    return (
      <div className="flex items-center justify-center py-4 bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black-500">No Hotels Found</h1>
          <p className="text-black-400 mt-2"><span className="text-l font-bold animate-pulse">Start Earning Now </span> by adding your first hotel!</p>


           
          <Link
            to="/add-hotel"
            className="inline-block mt-5 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-500 transition"
          >
            Add Hotel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-6 py-10 md:px-12 lg:px-20 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      {/* Header Section */}

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-700">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-lg font-bold rounded-md shadow hover:bg-blue-500 transition"
        >
          + Add Hotel
        </Link>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-xl transition transform hover:-translate-y-1 duration-200"
          >
            {/* Hotel Name */}
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-gray-600 mt-2 line-clamp-2">{hotel.description}</p>
            </div>

            {/* Hotel Info */}
            <div className="grid grid-cols-2 gap-2 px-6 pb-4">
              <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                <BsMap className="text-blue-500" />
                <span className="text-gray-700 text-sm">
                  {hotel.city}, {hotel.country}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                <BsBuilding className="text-blue-500" />
                <span className="text-gray-700 text-sm">{hotel.type}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                <BiMoney className="text-green-500" />
                <span className="text-gray-700 text-sm">
                  Rs{hotel.pricePerNight}/night
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                <BiHotel className="text-purple-500" />
                <span className="text-gray-700 text-sm">
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md col-span-2">
                <BiStar className="text-yellow-500" />
                <span className="text-gray-700 text-sm">{hotel.starRating} Stars</span>
              </div>
            </div>

            {/* View Details */}
            <div className="flex justify-end p-6 bg-gray-50">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="px-6 py-2 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-500 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
