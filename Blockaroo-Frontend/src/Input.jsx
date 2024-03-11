

const Input = (props) => {
    const {inputType, classStyle, data, setData, label} = props;

    return (
    <>
    <label>{label}</label>
    {inputType === "textarea" ? (
        <textarea className={classStyle} placeholder={data} onChange={(e) => setData(e.target.value)}/>

    ) : (
        <input type="text" className="classStyle" placeholder={data} onChange={(e) => setData(e.target.value)}/>
    )}
    
    </>  
    );
}
 
export default Input;