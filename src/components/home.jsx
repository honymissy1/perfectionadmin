import { useEffect, useState } from "react"

const Home = () =>{
    const [total, setTotal] = useState(0);
    const [custom, setCustom] = useState(0);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('')



    const date = new Date();
    useEffect(() =>{
        const fetchServer = async() =>{
            const data = await fetch(`https://perfectionserver.vercel.app/buyers`);

            const result = await data.json();

            setTotal(result.response)

        }


        fetchServer()
     


        
    }, [])

    const changePassword = async() =>{
      const change = document.getElementById('changepass').value;
      const confirm = document.getElementById('confirmpass').value;

      console.log(change);

      if(change !== confirm){
        setError("Password didn't match")
      }else{
        const pass = await fetch(`https://perfectionserver.vercel.app/password`, {
          mode: "cors",
          method: "post",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            password: change,
          })
        })  
        
        const data = await pass.json();

        if(pass.status === 200){
          console.log(data);
          alert('Password Updated Successfully')

        }else{
          alert('Error Updating Password')
        }

      }
    }

    const check = async() =>{
      const date = document.getElementById('date').value;
      const manual = document.getElementById('manual').value;

      const month = await fetch(`https://perfectionserver.vercel.app/buyers/${date}/${manual}`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          month: date,
          manual
        })
      })

      const result = await month.json();
      setResult(result.response)
      

    }
    return(
        <>
 <div class="border-b border-gray-200 dark:border-gray-700">
  <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
    <button type="button" class="hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 active" id="card-type-tab-item-1" data-hs-tab="#card-type-tab-1" aria-controls="card-type-tab-1" role="tab">
      Total Purchase
    </button>
    <button type="button" class="hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300" id="card-type-tab-item-2" data-hs-tab="#card-type-tab-2" aria-controls="card-type-tab-2" role="tab">
      Custom Report
    </button>

    <button type="button" class="hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-gray-300" id="card-type-tab-item-3" data-hs-tab="#card-type-tab-3" aria-controls="card-type-tab-3" role="tab">
     Settings
    </button>

  </nav>
</div>

<div class="mt-3" style={{ width:'100%'}}>
  <div className="flex justify-center flex-wrap" id="card-type-tab-1" style={{alignItems: 'center', flexDirection: 'column'}} role="tabpanel" aria-labelledby="card-type-tab-item-1">
    <p class="text-green-500 dark:text-gray-400 text-8xl">
        {total} 
    </p>

    <p style={{height: 'fit-content'}}>Total Manual Purchase</p>
  </div>
  
  <div  id="card-type-tab-2" role="tabpanel" aria-labelledby="card-type-tab-item-2">
    <div className="p-3 flex gap-5">

      <select id="manual" style={{border: '2px solid black'}} className="py-3 px-4 pr-9 block w-1/3 border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400">
      <option selected>Select Manual</option>
      <option value="July-Dec-2023">July-Dec-2023</option>
      <option value="Jan-June-2023">Jan-June-2023</option>
      <option value="July-Dec-2022">July-Dec-2022</option>
      <option value="Jan-June-2022">Jan-June-2022</option>   
      <option value="July-Dec-2021">July-Dec-2021</option>
      <option value="Jan-June-2021">Jan-June-2021</option>
      <option value="July-Dec-2020">July-Dec-2020</option>
      <option value="Jan-June-2020">Jan-June-2020</option>
      <option value="July-Dec-2019">July-Dec-2019</option>
      <option value="Jan-June-2019">Jan-June-2019</option>
      <option value="July-Dec-2018">July-Dec-2018</option>
      <option value="Jan-June-2018">Jan-June-2018</option>
      <option value="July-Dec-2017">July-Dec-2017</option>
      <option value="Jan-June-2017">Jan-June-2017</option>
      <option value="July-Dec-2016">July-Dec-2016</option>
      <option value="Jan-June-2016">Jan-June-2016</option>
      <option value="July-Dec-2015">July-Dec-2015</option>
      <option value="Jan-June-2015">Jan-June-2015</option>
      <option value="July-Dec-2014">July-Dec-2014</option>
      <option value="Jan-June-2014">Jan-June-2014</option>
      <option value="July-Dec-2013">July-Dec-2013</option>
      <option value="Jan-June-2013">Jan-June-2013</option>
      <option value="July-Dec-2012">July-Dec-2012</option>
      <option value="Jan-June-2012">Jan-June-2012</option>
      <option value="July-Dec-2011">July-Dec-2011</option>
      <option value="Jan-June-2011">Jan-June-2011</option>
      <option value="July-Dec-2010">July-Dec-2010</option>
      <option value="Jan-June-2010">Jan-June-2010</option>

    </select>

    <input id="date" type="month" style={{border: '2px solid black'}} placeholder="Select a Date" className="py-3 px-4 pr-9 block w-1/3 border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
    <button type="button" onClick={check} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
      Enter
    </button>
          
    </div>
   {
    result < 1 && (
      <h1 className="text-2xl text-center w-1/2 mx-auto"><span className="text-green-400">0</span> user bought for the selected month</h1>

    )
   }

   {
    result > 0 && (
      <h1 className="text-2xl text-center w-1/2 mx-auto"><span className="text-green-400">{result}</span> user(s) bought for the selected month</h1>
    )
   }
   </div>
   
  
     <div className="flex justify-center flex-wrap p-4 mx-auto" id="card-type-tab-3" style={{maxWidth: '400px', minWidth: '300px',alignItems: 'center', flexDirection: 'column'}} role="tabpanel" aria-labelledby="card-type-tab-item-3">
       <p style={{height: 'fit-content'}}>Change Password</p>

       <p className="text-red-500">{error}</p>
       <input id="changepass" onChange={() => setError('')} type="password" style={{border: '2px solid black'}} placeholder="Change Password" className=" my-2 py-3 px-4 pr-9 block w-full border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
       <input id="confirmpass" type="password" style={{border: '2px solid black'}} placeholder="Confirm Password" className="my-2 py-3 px-4 pr-9 block w-full border-gray-600 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />

       <button type="button" onClick={changePassword} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
        Update
      </button>

     </div>

  </div>
   </>
    )
}

export default Home