import styles from './Input.module.css'

export default function Input({type='text', style={}, name='', value=null, defaultValue=null, id=null, inputRef=null, isRequired=false, isDisabled=false, onChange=() => {},  onClick=() => {}, placeholder=null }) {
    // Check if the input is controlled or uncontrolled
    const isControlled = value !== null;
    return(
        
            isControlled ?
                <input style={style} type={type} name={name}  value={value} id={id ? id : null} className={styles.input} ref={inputRef} onChange={onChange} onClick={onClick} placeholder={placeholder} required={isRequired} disabled={isDisabled}/> :
                <input style={style} type={type} name={name}  defaultValue={defaultValue} id={id ? id : null} className={styles.input} ref={inputRef} onChange={onChange} onClick={onClick} placeholder={placeholder} required={isRequired} disabled={isDisabled} />
    )
}