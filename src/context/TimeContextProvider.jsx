import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const TimeContext = createContext(null);

function TimeContextProvider({children}) {

    const [lastMsgTime, setLastMsgTime] = useState("");
    
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date) => {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }
    return <TimeContext.Provider
        value={{
            lastMsgTime,
            setLastMsgTime,
            formatDate,
        }}>
        {children}
    </TimeContext.Provider>
}

TimeContextProvider.propTypes = {
    children: PropTypes.element,
}

export default TimeContextProvider;