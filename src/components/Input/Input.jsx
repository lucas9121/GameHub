
export default function Input({type='text', inlineStyle={}, name='', value='', defaultValue='', id='', className='', ref='', isRequired=false, isDisabled=false, onChange=() => {} }) {
    return(
        <input style={inlineStyle} type={type} name={name} value={value} defaultValue={defaultValue} id={id} className={className} ref={ref} onChange={onChange} required={isRequired} disabled={isDisabled}/>
    )
}