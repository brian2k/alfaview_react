import { ArrowBackIos } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from '../Styles'

function BackButton(props) {
    const navigation = useNavigate()

    return (
        <>     
            <Button
                style={styles.backButton}
                variant="text"
                startIcon={<ArrowBackIos/>}
                sx={{marginBottom: "10px", padding: "8px"}}
                onClick={() => {navigation(-1)}}>zurück
            </Button><br />    
        </>
    );
}

export default BackButton;