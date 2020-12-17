import React from 'react';
import { connect } from 'react-redux';

import FoodItem from "../../components/FoodItem";
import getItem from "../../instance";

import "./index.scss";
const Salad = (props) => {

   const [salads, setSalads] = React.useState([]);

   React.useEffect(() => {

      let arr = []
      if (props.items.length === 0) {
         getItem
            .get("/menu.json")
            .then(response => {
               props.GetItems(response.data);
               response.data.map((elem) => {
                  if (elem.id === "salad") {
                     return arr.push(elem)
                  }
                  return arr
               })
            })
      } else {
         props.items.map((elem) => {
            if (elem.id === "salad") {
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
      setSalads(arr);
   }, [props]);

   return (
      <div className="content">
         {console.log("salads-->", salads)}
         <div className="title">салати</div>
         <div className="food__items">
            {
               salads.map((food) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Salad);