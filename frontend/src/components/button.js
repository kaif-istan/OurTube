//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'
import { Link } from 'react-router-dom'

function Button(props) {
  return (
    <button disabled={props.disabled} onClick={props.onClick} className={'flex shadow-md items-center justify-center text-white p-1 px-4 mr-4 text-center border-2 rounded-md border-indigo-600' + (props.onlyOutline ? ' ' : ' bg-indigo-500') + (props.fullWidth ? ' w-full' : ' ')}>
      {props.text}
      {props.OnlyOutline}
    </button>
  )
}

Button.defaultProps = {
  OnlyOutline: false,
  fullWidth: false,
}

export default Button
