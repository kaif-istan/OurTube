//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

function TextInput(props) {
  return <input className={`shadow-md bg-gray-700 border-2 border-indigo-600 rounded-md ${ !props.side ? `w-full` : `flex-1 ml-1` } py-2 px-2 my-2 text-white-200 leading-tight outline-none`} type='text' required autoFocus placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
}

TextInput.defaultProps = {
  placeholder: 'Type Here  ',
}

export default TextInput
