import React from "react";
import Form from "./Form/Form"
import CardList from "./CardList/CardList"
import "./Inventory.css";
// import Modal from "./Modal/Modal";

export default function Inventory() {

  return (
    <>    
      
      <main className="home-page-main">
        <Form />
        <CardList />
      </main>
    </>
  );
}
