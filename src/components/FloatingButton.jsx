import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link
      to={"https://wa.me/+62895335545919?text=Halo,+saya+ingin+belanja"}
      target="_blank"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      <h2 className="m-2">hubungi kami</h2>
    </Link>
  );
};

export default FloatingButton;
