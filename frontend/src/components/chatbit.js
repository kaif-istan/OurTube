//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

function Chatbit(props) {
  return (
    <div type={props.type} className='flex flex-col w-full h-auto my-1 border-b-2 border-gray-800 justify-start'>
      <a className='text-indigo-600 underline'>{props.name}</a>
      <a>{props.text}</a>
    </div>
  )
}

Chatbit.defaultProps = {}

export default Chatbit
