import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { items } from '../data/data';
import { useNavigate } from 'react-router';
import { FruitBasket } from '../assets/Icons';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from "../redux/actions";
import { addItemToCartById, getUserById } from '../services/userServices';
import { getUserDetailsFromToken } from '../services/authServices';
import APIResponseStatus from '../components/APIResponseStatus';
import Loader from '../components/Loader';
import { getAllInventoryItems } from '../services/inventoryServices';


function Home() {
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [pageLoading, setPageLoading] = useState("not-loaded");
  const [inventoryItems, setInventoryItems] = useState([]); // State to hold inventory data
  const [addToCartError, setAddToCartError] = useState(null); // Error state for adding items to cart



  
  const myProfiledata = useSelector(
    (state) => state.authReducer.myUserProfile
  );
  const dispatch = useDispatch();

  const fetchInventory = async () => {
    const data = await getAllInventoryItems(); // Call the getInventory function
    setInventoryItems(data|| []); // Update state with fetched inventory data
    setPageLoading("loaded"); // Mark the page as loaded after data is fetched
  };

  const getMyProfileData = async (myUserId) => {
    await getUserById(myUserId)
      .then((res) => {
        // console.log("in TASKPAGE RETURNED TASK ",res.code);
        if (res.code === "ERR_NETWORK") {
          setNetworkError(true);
          console.error("NETWORK ERROR ");
          setPageLoading("error");
        } else {
          setPageLoading("loaded");
          dispatch(authActions.loginAction(res));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };


  useEffect(() => {
    const existingUser = getUserDetailsFromToken();
    // console.log("EXISITING USER ID : ",existingUser)

    if (existingUser?._id) {
      getMyProfileData(existingUser._id);
      fetchInventory(); // Fetch inventory data on page load


    } else {
      navigate("/login");
      setPageLoading("loaded");
    }
  }, [rerender]);

  // State to keep track of selected category and search term
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');






  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter items based on selected category and search term
  const filteredItems = inventoryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

   // Function to handle adding an item to the cart
   const handleAddToCart = async (itemId) => {
    const existingUser = getUserDetailsFromToken();
    if (existingUser?._id) {
      const result = await addItemToCartById(existingUser._id, itemId);
      if (result.error) {
        setAddToCartError("Error adding item to cart.");
        console.error(result.error);
      } else {
        setAddToCartError(null); // Clear any previous errors
        alert("Item added to cart!"); // Optional: Display a success message or update UI
        setRerender(!rerender)
      }
    } else {
      navigate("/login"); // Redirect to login if the user is not logged in
    }
  };

  return (
    <>
    {pageLoading === "loaded"?

    <div>
      <Navbar myProfiledata={myProfiledata} onSearch={handleSearchInputChange} page="home" />
      <div 
      data-aos="fade-up"
      data-aos-duration="1000"
      className="flex flex-col flex-1">
        {/* Category Buttons */}
        <div 
        data-aos="fade-up"
        className="flex justify-center my-5">
          <div className="flex flex-row flex-wrap gap-10 justify-center text-[14px] font-semibold text-gray-400">
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'All' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('All')}
            >
              All Items
            </button>
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'Breads' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('Breads')}
            >
              Breads
            </button>
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'Vegetables' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('Vegetables')}
            >
              Vegetables
            </button>
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'Fruits' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('Fruits')}
            >
              Fruits
            </button>
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'Non-Veg' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('Non-Veg')}
            >
              Non-Veg
            </button>
            <button
              className={`px-5 py-1 rounded-full ${
                selectedCategory === 'Others' ? 'bg-gray-100 text-orange' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryClick('Others')}
            >
              Others
            </button>
          </div>
        </div>

        {/* Display Items */}
        <div className="flex mx-auto w-[85%] flex-col ">
          <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          className="text-[30px] font-black text-orange">
            {selectedCategory === 'All' ? 'All Items' : selectedCategory}
          </div>
          <div
          data-aos="fade-up"
          data-aos-duration="1000"

           className="grid max-h-[30rem] p-2 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-100 rounded-lg p-4 flex flex-col cursor-pointer hover:shadow-lg hover:scale-[101%] "
                >
                  <div className='min-h-[200px] max-h-[200px] flex items-center  justify-center'>

                  <img
                    src={item.image}
                    alt={item.name}
                    className=" aspect-auto scale-[60%] m-4"
                  />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-gray-500">{item.name}</h3>
                  <p className="text-[10px]  px-4 py-1 rounded-full bg-gray-100 font-bold w-fit text-orange">
                    {item.category}
                  </p>
                  <p className="flex-1 mt-2 text-sm text-gray-600 ">{item.description}</p>
                 <div className='flex items-center justify-between my-1'>
                  <p className="mt-2 text-lg font-bold text-right text-orange">${item.price}</p>
                  <button 
                   onClick={() => handleAddToCart(item._id)} // Add onClick event for adding to cart
                  className='bg-orange hover:bg-[#e35416] font-semibold text-center w-fit px-4 text-[12px] rounded-[8px] py-2 text-[#fff]'>Add to Cart</button>
                 </div>
                </div>
              ))
            ) : (
              <div className='flex flex-col justify-center'>
                <div className='flex justify-center opacity-50 grayscale'>
                <FruitBasket/>
                </div>
              <p className="col-span-4 font-semibold text-center text-gray-400">
                No items match your search for '{searchTerm}'
              </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    :
     pageLoading === "not-loaded" ? (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="flex justify-center text-[16px] font-light flex-col ">
          <Loader />
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center flex-1 w-full h-[100vh]">
        <APIResponseStatus
          status={false}
          message={`${networkError ? "Network Error" : "An Error Occured"}`}
        />
      </div>
    )}
    </>
  );
}

export default Home;
