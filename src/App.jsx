import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Image from './assets/logo.png';
import User from "./context/user";
import { useContext } from "react";
import Images from './assets/login.jpg'
// import LoginModal from "./loginModal";


function App() {

  const UserLogin = useContext(User)


  const [login, setLogin] = useState({})
  const [money, setMoney] = useState(0);
  const [userId, setUserId] = useState('');
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('')

  // Make Payment function
  function makePayment(e){
    e.preventDefault()
    setLoading(true);

    setTimeout(() =>{
      setLoading(false);
      setError('Problem making payment at the moment check you internet connection ')
    }, 7000)

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-1a77c9626f9ed7c7af67eec75e44ac7b-X",
      tx_ref: uuidv4(),
      amount: amount,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      redirect_url: "https://perfectionserver.vercel.app/payment",
      meta: {
        consumer_id: email,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: email,
      },

      customizations: {
        title: "Ministry of Perfection Manual",
        description: "MOP Manual Credit to activate user accounts",
        logo: Image,
      },


    });
  }


  const modal = document.querySelector('.overlay')

  const handleLogin = async () =>{
    const fetcher = await fetch(`https://perfectionserver.vercel.app/adminsignin`, {
      method: 'post', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const result = await fetcher.json();

    console.log(result);

    if(result.message === 'success'){
      UserLogin.setLogin(result.response.email, result.accountBalance);
      localStorage.setItem('user', JSON.stringify({email: result.response.email, accountBalance: result.response.accountBalance}))
      setMoney(result.response.accountBalance);
      setEmail(result.response.email)
      modal.classList.remove('display');
    }else{
      console.log('Not going to login');
    }
  }

  useEffect(() =>{

    // localStorage.setItem('user', JSON.stringify({email: result.response.email, accountBalance: result.response.accountBalance}))
    if(localStorage.getItem('user') === null){
      return;
    }
    
    let localItem = JSON.parse(localStorage.getItem('user'));
    console.log(localItem);
    
    setMoney(localItem.accountBalance)
    setEmail(localItem.email)
    // setLogin(UserLogin.loginState.accountBalance);
  }, [])

  const activateUser = async(e) =>{
    e.preventDefault();

    fetch(`https://perfectionserver.vercel.app/user`, {
      method: 'post',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({
        userId: userId
      })
    }).then(result => result.text())
    .then(response => {
      if(response === "User Successfully Activated"){
        fetch(`https://perfectionserver.vercel.app/updateaccount`, {
          method: 'post',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify({
            email: email
          })
        }).then(result => result.json())
        .then(response =>{
          setMoney(response.accountBalance)
          window.location.href = '/'
        })
      }
      setData(response)
    })

    setUserId('');

    setTimeout(() =>{
      setData('')
    }, 5000)
  }


  const handleClick = (e) =>{
    e.target.classList.remove('display');   
    console.log(e.target);
}

const handleButton = (e) =>{
  const modal = document.querySelector('.overlay')
  modal.classList.add('display');
}

const handleLogout = () =>{
  UserLogin.setLogout()
  localStorage.removeItem('user')
}

  return (
    <>
      <nav className="gap-20 bg-black flex center p-7 justify-between items-center border-b-2 flex-wrap">
        <div className="flex" style={{alignItems: 'center'}}>
        <img src={Image} alt="" width={100}/>
          <h1 className="text-3xl font-bold text-white">Perfection</h1>

        </div>

        {/* Fetch from the server */}
        {
          UserLogin.loginState ? (<div className="text-white">
          <p>{email}</p>
          <p className="text-green-600 font-bold"><span className="text-white font-normal">Current Balance: </span>&#8358;{money}</p>
          <button onClick={handleLogout} class="inline-flex text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
              Logout
          </button>
        </div>) : (<button onClick={handleButton} class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
            Login
        </button>)
        }

      </nav>

      <main className="flex justify-between gap-5">
        {
                !UserLogin.loginState ? (
                  <div className="flex-1 p-10">
                    <h1 className="text-xl text-center">Login to your account to use </h1>
                    <img src={Images} alt="Login" />
                    <button onClick={handleButton} style={{margin: '0px auto', textAlign: 'center'}} class="inline-flex text-white bg-red-500 border-0 my-4 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-md">
                      Login
                    </button>
                  </div>
        
      ):(       <div>
        {
          UserLogin.loginState && money < 1000 ? (
            <div className="flex-1 p-10">
            <h1 className="text-2xl font-bold mb-3 text-gray-700 font-ubuntu">Buy More <span className="text-red-400">MOP Manual</span> Credit</h1>
            <div>
              <form action="">
                <div class="relative mb-4">
                    <label for="amount" class="leading-7 text-sm text-gray-600">Amount</label>
                    <input onChange={(e) => setAmount(e.target.value)} value={amount} type="number" id="amount" name="amount" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
             <button onClick={makePayment} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
               {loading? 'Loading': 'Buy'} 
            </button>
            </form>
            </div>



          </div>
          ) :
          (
            <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-3 text-gray-500">Unlock Manual</h1>
          <form action="">
                <div class="relative mb-4">
                    <label for="amount" class="leading-7 text-sm text-gray-600">Activate User</label>
                    <input type="telephone" id="amount" onChange={(e) => setUserId(e.target.value)} value={userId} name="amount"
                     class="w-full bg-white rounded border border-gray-300
                      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                       text-base outline-none text-gray-700 py-1 px-3 leading-8 
                       transition-colors duration-200 ease-in-out" />
                </div>
             <button onClick={activateUser}  class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Activate User
            </button>
            </form>

            {
              !data && ('')
            }

            {
               data === 'User Account Already Created'  && (
                <div className="text-white w-full mt-4 bg-red-500" style={{
                  borderRadius:'5px',
                  boxShadow: '.5px .5px 2px black'}}>
                 <h1 className="p-5">{data}</h1>
                </div>
               )
            }

            {
              data === 'User Successfully Activated' && (
                <div className="text-white w-full mt-4 bg-green-500" style={{borderRadius:'5px', boxShadow: '.5px .5px 2px black'}}>
                <h1 className="p-5">{data}</h1>
              </div>
              )
            }



        </div>)
        }
        </div>)

        }

        



        <div className="bg-green-300 flex-1 hidden md:block" style={{height: '100vh', minWidth: '500px'}}>
          <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
              <h1 class="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Vision</h1>
              <div class="flex flex-wrap -m-4">
                <div class="p-4 md:w-full">
                  <div class="h-full bg-gray-100 p-8 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <p class="leading-relaxed mb-6">Go and Perfect my people</p>
                    <p class="leading-relaxed mb-6">Go and Prepare them for rapture</p>
                    <p class="leading-relaxed mb-6">Go tell them they are Spirits</p>
                    <a class="inline-flex items-center">
                      <img alt="testimonial" src="https://dummyimage.com/106x106" class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                      <span class="flex-grow flex flex-col pl-4">
                        <span class="title-font font-medium text-gray-900">Bishop Dr. S.I Okelezoh</span>
                        <span class="text-gray-500 text-sm">General Overseer</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section> 
        </div>
        
      </main>



      {/* Modal */}
      <div onClick={handleClick} className="overlay">
            <div className="modal">
                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                
                <div class="relative mb-4">
                    <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <button onClick={handleLogin} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Login
                </button>
            </div>
        </div>
    </>
  )
}

export default App
