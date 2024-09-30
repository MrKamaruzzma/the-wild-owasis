// import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
// import Button from "../ui/Button";
// import { useState } from "react";
// import CreateCabinForm from "../features/cabins/CreateCabinForm";

import "react-toastify/dist/ReactToastify.css";
import AddCabin from "../features/cabins/AddCabin";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinTableOperations from "../features/cabins/CabinsTableOperations";
// import { getCabins } from "../services/apiCabins";

function Cabins() {
  // useEffect(function(){
  //   getCabins().then((data) => console.log(data))
  // },[])

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        {/* <p>Filter/Sort</p> */}


        <CabinTableOperations/>

        {/* <img src="https://ikcgmuvkxbvqayyfjqhw.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" alt="cabin" /> */}
      </Row>

      <Row>
        <CabinTable />
        <AddCabin>
          <CreateCabinForm />
        </AddCabin>
      </Row>
    </>
  );
}

export default Cabins;
