

//tailwind & css
import '../styles/tailwind.css';
import '../styles/main.css';

//Components
import TextInput from '../components/textInput.js';
import Button from '../components/button.js'

// Jquery
import $ from 'jquery'

function Home() {
  return (
    <div className="back flex flex-row w-full py-3 px-12 items-center justify-center">
      <div className="flex flex-col bg-gray-900 h-5/6 lg:w-1/3 md:w-1/2 sm:w-1/2 p-10 border-2 border-indigo-600 rounded-md items-center justify-center">
        <a className="text-center w-100 text-2xl mt-3 underline"> Join the Room </a>
        <a className="text-center w-100 text-md my-2 opacity-70">Enjoy the vedio with friend losing no Sync !</a>
        <TextInput placeholder="Enter the Room Code"/>
        <a className="text-center w-100 text-xl my-3"> or</a>
        <Button text="Create A Room" fullWidth={true} href="/app"/>
      </div>
    </div>
  );
}

export default Home;