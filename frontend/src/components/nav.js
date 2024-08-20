//tailwind & css
import '../styles/tailwind.css'
import '../styles/main.css'

//Components
import Button from './button.js'

function Nav(props) {
  return (
    <div className='flex flex-grow h-16 bg-gray-900 shadow-xl px-4 items-center border-b-2 border-indigo-600'>
      <a href='/' className='text-xl'>
        OurTube
      </a>

      <div className='flex flex-grow'></div>

      <Button text='About' onlyOutline={true} />
      <Button text='Home' />
    </div>
  )
}

export default Nav
