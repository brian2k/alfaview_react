import ListCategory from './ListCategory';
import mapDispatch from '../redux/mapDispatch';
import mapState from '../redux/mapState';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// HANDLES SHOPPTINGLIST AND CHECKBOXES

function Shoppinglist(props) {
    useEffect(() => {
        props.resetStates()
    }, [])

    const navigation = useNavigate()

    // Handles Checkboxes and adds them to selectedCheckboxes Array
    const checkboxHandler = (event, id) => {
        if(event.target.checked && !props.selectedCheckboxes.find((value) => {return value === id})){
            props.selectCheckboxes(id)
        }else{
            props.deselectCheckboxes(props.selectedCheckboxes.filter(value => value !== id))
        }
        
    }

    return (
        <div>
            <h2>Shoppinglist</h2><br />
            <button onClick={() => {navigation(-1)}}>zurück</button>
            <ListCategory />
            <ul className='shoppinglist'>
                {props.shoppinglist.map((value) => {
                    return value.cat === props.selectedCat &&
                                      
                        <li key={value.id}>
                            <label className="checkbox_label">
                                {value.amount} x {value.item}
                                <input type="checkbox" onChange={(e) => checkboxHandler(e, value.id)} />
                                <span className="checkbox"></span>
                            </label>
                        </li>
                    
                })}
            </ul>
            <fieldset>
                <legend>Neuen Einkauf hinzufügen</legend>       
                <div className="inputform">
                    <input type="text" id="item" placeholder="Artikelname" />
                    <input id="amount" type="number" min="1" max="999" placeholder="1" />
                </div>
                <button onClick={() => {props.addGrocery({
                    cat: props.selectedCat,
                    amount: document.querySelector("#amount").value,
                    item: document.querySelector("#item").value
                    })
                    document.querySelector("#item").value = ""
                    document.querySelector("#amount").value = ""
                    }}>Einkauf hinzufügen</button>
                <button className={`${!props.selectedCheckboxes.length && "hidden"} save`} onClick={() => {props.checkGroceries(props.selectedCheckboxes)}}>Änderungen Speichern</button>
            </fieldset>
        </div>
    );
}

export default connect(mapState, mapDispatch) (Shoppinglist);