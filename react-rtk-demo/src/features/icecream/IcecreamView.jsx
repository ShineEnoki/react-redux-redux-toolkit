import { useDispatch, useSelector } from "react-redux"
import { ordered, restocked } from './iceCreamSlice'

const IcecreamView = () => {
    const numOfIcecream = useSelector(state => state.icecream.noOfIcecream);
    const dispatch = useDispatch();
    return (
        <div>
            <h2> Number Of Icecream - {numOfIcecream} </h2>
            <button onClick={() => dispatch(ordered())}> Order Icecream </button>
            <button onClick={() => dispatch(restocked(5))}> Restock Icecream </button>
        </div>
    )
}

export default IcecreamView