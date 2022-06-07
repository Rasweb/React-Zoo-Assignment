import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimals, IMoreAnimal } from "../models/IAnimals";
import { StyledImage } from "./styledComponents/StyledImages";

interface IAnimal {
  animals: IAnimals;
}

export const Animal = (props: IAnimal) => {
  const [animal, setAnimal] = useState<IMoreAnimal>({
    id: 0,
    name: "",
    latinName: "",
    yearOfBirth: 0,
    imageUrl: "",
    longDescription: "",
    isFed: false,
    lasFed: "",
    medicine: "",
  });

  let params = useParams();

  useEffect(() => {
    if (Animal.length !== 0) return;
    axios
      .get<IMoreAnimal>(
        "https://animals.azurewebsites.net/api/animals" + params.id
      )
      .then((data) => {
        setAnimal(data.data);
      });
  });

  return (
    <div>
      <h3>
        {animal.name}, {animal.latinName}
      </h3>
      <StyledImage src={animal.imageUrl} alt={animal.name}></StyledImage>
      <p>{animal.yearOfBirth}</p>
      <p>{animal.longDescription}</p>

      {animal.medicine === "inga" ? (
        <p>Ingen medicine</p>
      ) : (
        <p>{animal.medicine}</p>
      )}
      <p>Last fed: {animal.lasFed}</p>
      <p>Is fed: {animal.isFed}</p>
    </div>
  );
};

//   // Cart
//   const showCartFunc = () => {
//     setShowCart(true);
//   };
//   const hideCartFunc = () => {
//     setShowCart(false);
//   };
//   const addToCart = () => {
//     console.log("added to cart");
//     setInCart(true);
//     setCart([...cart, product]);
//     setShowCart(true);
//     console.log(product);
//   };
//   const removeFromCart = (id: string) => {
//     // Adds every item to a new array except the pressed id item.
//     const newCart = cart.filter((item) => item.id !== id);
//     // The new array replaces the old.
//     setCart(newCart);
//     setInCart(false);
//     console.log("id: ", id);
//     console.log("Delete");
//   };
//   let cartHtml = cart.map((item) => {
//     return (
//       <div key={item.id}>
//         <h4>{item.name}</h4>
//         <img className="cartImg" src={item.imageUrl} alt={item.name} />
//         <p>{item.price} kr</p>
//         <button onClick={() => removeFromCart(item.id)}>
//           Remove from Cart
//         </button>
//       </div>
//     );
//   });

//   return (
//     <>
//       {isLoading ? (
//         <>Loading...</>
//       ) : (
//         <div>
//           {/* Cart */}
//           {showCart ? (
//             <section className="productCont">
//               <h3>The Cart</h3>
//               {cartHtml}
//               <button onClick={hideCartFunc}>{cart.length}, Hide Cart</button>
//             </section>
//           ) : (
//             <section className="productCont">
//               <button onClick={showCartFunc}>{cart.length}, Open Cart</button>
//             </section>
//           )}
//           <div className="productCont">
//             <h3>
//               {product.name}, {product.year}
//             </h3>
//             <img src={product.imageUrl} alt={product.name} />
//             <p>{product.price} kr</p>
//             <p className="descCont">{product.description}</p>
//             {!inCart ? (
//               <button onClick={addToCart}>Add to cart</button>
//             ) : (
//               <div>
//                 <button>To checkout</button>
//                 <Link to="/checkout">To checkout</Link>
//                 {/* Cart */}
//                 {/* <CartCheckout cart={cart}></CartCheckout> */}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
