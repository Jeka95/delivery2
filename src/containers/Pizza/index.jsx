import React from 'react';
import { connect } from 'react-redux';

import FoodItem from "../../components/FoodItem";
import getItem from "../../instance";

import "./index.scss";
const Pizza = (props) => {

   const [pizzas, setPizzas] = React.useState([]);

   React.useEffect(() => {
      let arr = []
      if (props.items.length === 0) {
         getItem
            .get("/menu.json")
            .then(response => {
               props.GetItems(response.data);
               response.data.map((elem) => {
                  if (elem.id === "pizza") {
                     return arr.push(elem)
                  }
                  return arr
               })
            })
      } else {
         props.items.map((elem) => {
            if (elem.id === "pizza") {
               return arr.push(elem)
            }
            return arr
         })
      }
      props.favorite.map((elem) => {
         const isSameName = (element) => element.name === elem.name;
         let num = arr.find(isSameName);
         if (num !== undefined) {
            num.bool = true;
         }
      })
      setPizzas(arr);
   }, [props]);

   return (
      <div className="content">
         <div className="title">піца</div>
         <div className="food__items">
            {
               pizzas.map((food) => {
                  return (
                     <FoodItem key={food.name} food={food} />
                  )
               })
            }
         </div>
      </div>
   );
}
const mapStateToProps = (state) => {
   return {
      items: state.itemsServer,
      favorite: state.favorite,
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      GetItems: (obj) => dispatch({ type: 'GET_ITEMS', payload: obj }),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pizza);

