

export const Checkbox = ( {label} ) => {
    return (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" />
                <span>{label}</span>
            </label>
        </div>
    );
};