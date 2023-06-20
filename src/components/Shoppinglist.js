import ListCategory from './ListCategory';
import mapDispatch from '../redux/mapDispatch';
import mapState from '../redux/mapState';
import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Checkbox, Fab, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { Checklist, AddCircleOutline, Save, ArrowBackIos } from '@mui/icons-material';
import { TextField } from '@mui/material';
import BackButton from './assets/BackButton';
import { Add } from '@mui/icons-material';
import * as styles from './Styles'
import { Close } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

// HANDLES SHOPPTINGLIST AND CHECKBOXES

function Shoppinglist(props) {
    
    const itemValue = useRef()
    const amountValue = useRef()
    const [item, setItem] = useState("")
    const [amount, setAmount] = useState("1")

    // Handles Checkboxes and adds them to selectedCheckboxes Array
    const checkboxHandler = (event, id) => {
        if(event.target.checked && !props.selectedCheckboxes.find((value) => {return value === id})){
            props.selectCheckboxes(id)
        }else{
            props.deselectCheckboxes(props.selectedCheckboxes.filter(value => value !== id))
        }
    }

    const inputVerifyer = () => {
        if(item !== ""){
            props.addGrocery({
                cat: props.selectedCat,
                amount: amount,
                item: item
            })
            setItem("")
            setAmount("1")
        }
        else{
            itemValue.current.error = true
            itemValue.current.focus()

        }
    }

    const errorHandler = () => {
            return false
    }

    useEffect(() => {
        props.resetStates()
    }, [])



    return (
        <div>
            <ListCategory />
            <Paper elevation={5} sx={{mt:1}}>
                <List>
                    {props.shoppinglist.map((value) => {
                        return value.cat === props.selectedCat &&
                        <ListItem key={value.id} className='shoppinglist'>
                            <ListItemButton role={undefined} onChange={(e) => checkboxHandler(e, value.id)} dense>
                                <ListItemIcon>
                                    <ListItemIcon>
                                        <FormControlLabel
                                            className="checkbox_label"
                                            checked={props.selectedCheckboxes[value.id]}
                                            aria-labelledby={`id-${value.id}`}
                                            control={<Checkbox
                                                />} />
                                    </ListItemIcon>
                                    <ListItemText id={`id-${value.id}`} primary={value.amount + "x" + value.item} />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>

                    })}
                </List>
            </Paper><br />
            <Box style={styles.shoppinglistInput} display="flex" flexDirection="row" backgroundColor="white">
                <TextField
                    inputRef={amountValue}
                    variant="standard"
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{ inputProps: { min: 1, max: 999 } }}
                    size="large"
                    error={amount === ""}
                    placeholder="1"
                    sx={{borderRadius: "0px", backgroundColor: "white", mt: 2, ml: 1 }}
                />
                <Close sx={{m:2}}/>
                <TextField
                    // TO DO: Use Reference for Validation
                    inputRef={itemValue}
                    variant="standard"
                    type="text"
                    id="item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Artikelname"
                    fullWidth
                    required
                    size="large"
                    sx={{ borderRadius: "none", backgroundColor: "white", mt: 2, mr: 1 }}
                />
                    <Button
                        variant="contained"
                        onClick={() => {
                            inputVerifyer()
                        }}><Add />
                    </Button>
            </Box>

            {
                props.selectedCheckboxes.length > 0 &&
                    <Box sx={{margin: "0px", inset: "auto 0px 56px", position: "fixed", bottom: "136px"}}>
                        <Fab
                            style={styles.fabstyleShoppinglist}
                            color="green"
                            onClick={
                                () => {props.checkGroceries(props.selectedCheckboxes)}
                            }><Check />
                        </Fab>
                    </Box>
            }
        </div>
    );
}

export default connect(mapState, mapDispatch) (Shoppinglist);