import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import React from "react";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress sx={{ height: '15px', borderRadius: "30px", background: "#0073ff3b" }} variant="determinate" {...props} />
            </Box>

        </Box>
    );
}
LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel