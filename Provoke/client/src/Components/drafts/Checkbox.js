import { useState } from "react";


export const Checkbox = ( {label, checked} ) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    return (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
                <span>{label}</span>
            </label>
            {/* <p className="checked-text"><i>{isChecked ? "Quote will publish with draft" : "Quote will not appear with draft"}</i></p> */}
        </div>
    );
};