import React from "react";

const Card = ({ title, price, description, image }) => {
  return (
    <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
      <figure className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-60 h-60 object-cover transition-transform duration-500 hover:scale-110"
        />
      </figure>
      <div className="card-body p-6 text-center">
        <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="card-actions">
          <span className="text-lg font-semibold text-yellow-500 dark:text-white">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
