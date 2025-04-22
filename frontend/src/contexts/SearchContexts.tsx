import React, { useContext, useState } from "react";


// for managing and sharing hotel search details, like destination, check-in/out dates, number of adults/children, and hotel ID

//initializing session storage


//Any child component can use the useSearchContext hook to access or update the state.


type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId: string;
    saveSearchValues: (
      //Function to update the context state and persist values
      destination: string,
      checkIn: Date,
      checkOut: Date,
      adultCount: number,
      childCount: number
    ) => void;
  };


  const SearchContext = React.createContext<SearchContext | undefined>(undefined);
  //initially undefined        &to ensure type safety


  type SearchContextProviderProps = {
    children: React.ReactNode;
  };
  

  export const SearchContextProvider = ({
    children,
  }: SearchContextProviderProps) => {

    //This ensures data persists even if the page is refreshed.
    const [destination, setDestination] = useState<string>(
      () => sessionStorage.getItem("destination") || ""
    );

    const [checkIn, setCheckIn] = useState<Date>(
      () =>
        new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
    );

    const [checkOut, setCheckOut] = useState<Date>(
      () =>
        new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
    );

    const [adultCount, setAdultCount] = useState<number>(() =>
      parseInt(sessionStorage.getItem("adultCount") || "1")
    );

    const [childCount, setChildCount] = useState<number>(() =>
      parseInt(sessionStorage.getItem("childCount") || "1")
    );

    const [hotelId, setHotelId] = useState<string>(
      () => sessionStorage.getItem("hotelID") || ""
    );
  
    const saveSearchValues = (
      destination: string,
      checkIn: Date,
      checkOut: Date,
      adultCount: number,
      childCount: number,
      hotelId?: string
    ) => {
      setDestination(destination);
      setCheckIn(checkIn);
      setCheckOut(checkOut);
      setAdultCount(adultCount);
      setChildCount(childCount);

      if (hotelId) {
        setHotelId(hotelId);
      }
  
      sessionStorage.setItem("destination", destination);
      sessionStorage.setItem("checkIn", checkIn.toISOString());
      sessionStorage.setItem("checkOut", checkOut.toISOString());
      sessionStorage.setItem("adultCount", adultCount.toString());
      sessionStorage.setItem("childCount", childCount.toString());
  
      if (hotelId) {
        sessionStorage.setItem("hotelId", hotelId);
      }
    };


  
    return (
      <SearchContext.Provider
        value={{
          destination,
          checkIn,
          checkOut,
          adultCount,
          childCount,
          hotelId,
          saveSearchValues,
        }}
      >
        {children}
      </SearchContext.Provider>
    );
  };

  
  export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
  };