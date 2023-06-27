import PropTypes from "prop-types";
import "/src/styles/Time.css"

function Time({timeStr}) {
    const [date, time] = timeStr.split("T");

    return <div data-tooltip={date} className="timestamp">
        <p className="mb-2"><u>{time}</u></p>
    </div>
}

Time.propTypes = {
    timeStr: PropTypes.string.isRequired,
}


export default Time;
