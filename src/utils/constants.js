import mobilesDark from "../svgs/entryPageSvgs/mobiles_dark.svg";
import mobilesLight from "../svgs/entryPageSvgs/mobiles_light.svg";
import electronicsDark from "../svgs/entryPageSvgs/electronics_dark.svg";
import electronicsLight from "../svgs/entryPageSvgs/electronics_light.svg";
import allDark from "../svgs/entryPageSvgs/all_dark.svg";
import allLight from "../svgs/entryPageSvgs/all_light.svg";
import fashionDark from "../svgs/entryPageSvgs/fashion_dark.svg";
import fashionLight from "../svgs/entryPageSvgs/fashion_light.svg";

export const buyerPageCategoriesList = [
  {
    type: "all",
    image: [allLight, allDark],
    text: "All",
  },
  {
    type: "mobiles",
    image: [mobilesLight, mobilesDark],
    text: "Mobiles",
  },
  {
    type: "electronics",
    image: [electronicsLight, electronicsDark],
    text: "Electronics",
  },
  {
    type: "fashion",
    image: [fashionLight, fashionDark],
    text: "Fashion",
  },
];

export const CLOUDINARY_IMAGE_ACCESS_URL = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1717994027/${process.env.REACT_APP_CLOUDINARY_PRESET}/`;
export const CLOUDINARY_PRODUCTS_IMAGE_ACCESS_URL = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1718463806/${process.env.REACT_APP_CLOUDINARY_PRODUCTS_PRESET}/`;
export const CLOUDINARY_IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
export const API_URL = "http://localhost:8000/api/";

export const NAVIGATION_LINKS = [
  {
    nav: "/home",
    name: "Home",
  },
  {
    nav: "/cart",
    name: "Cart",
  },
  {
    nav: "/orders",
    name: "Orders",
  },
  {
    nav: "/contact",
    name: "Contact",
  },
];

export const LANGUAGES_LIST = [
  {
    lan: "EN",
    language: "en",
  },
  {
    lan: "HI",
    language: "hi",
  },
];

export const TRANSLATE_API = "https://google-translator9.p.rapidapi.com/v2";

export const changeLanguage = async (text, from, to) => {
  if (!text || !from || !to) {
    return;
  }
  let convertedText = "";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "21bd153868mshc02d65a505100b3p1e031bjsncd39968d4b1e",
      "x-rapidapi-host": "google-translator9.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: {
      q: "The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza pyramid complex.",
      source: "en",
      target: "zh-CN",
      format: "text",
    },
  };
  try {
    const response = await fetch(TRANSLATE_API, options);
    console.log(response);
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const filterProductImages = (productsList) => {
  if (!productsList) return [];

  const sortedData = productsList?.slice().sort((a, b) => {
    const dateA = new Date(a?.createdAt);
    const dateB = new Date(b?.createdAt);

    if (isNaN(dateA) || isNaN(dateB)) {
      return isNaN(dateA) ? 1 : -1;
    }
    return dateB - dateA;
  });

  const list = sortedData?.map((eachProduct) => {
    return {
      image: eachProduct?.image,
      id: eachProduct?._id,
      name: eachProduct?.name,
    };
  });
  return list;
};

export const filterDiscountProducts = (productsList) => {
  if (!productsList) return [];

  const sortedData = productsList?.slice().sort((a, b) => {
    return b?.discount - a?.discount;
  });
  const list = sortedData?.map((eachProduct) => {
    return {
      image: eachProduct?.image,
      id: eachProduct?._id,
      name: eachProduct?.name,
      discount: eachProduct?.discount,
    };
  });
  return list;
};

export const discountPriceCalculator = (price, discount) => {
  if (!price || !discount) return 0;
  const newPrice = price - (price * discount) / 100;
  return Math.round(newPrice);
};

export const userTypes = [
  {
    type: "buyer",
    name: "Buyer",
  },
  {
    type: "seller",
    name: "Seller",
  },
];

export const userReviewStarRatings = [
  {
    rating: 1,
    message: "Worst 😡",
  },
  {
    rating: 2,
    message: "Bad 😠",
  },
  {
    rating: 3,
    message: "Average 😐",
  },
  {
    rating: 4,
    message: "Good 😀",
  },
  {
    rating: 5,
    message: "Exellent 😍",
  },
];
