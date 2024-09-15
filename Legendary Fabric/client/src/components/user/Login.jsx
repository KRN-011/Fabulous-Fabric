import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { loginUser } = useContext(AppContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value });
  }

  const { email, password } = formData

  const submitHandler = async (e) => {
    e.preventDefault()

    const result = await loginUser(email, password);

    if (result.success) {
      navigate('/')
    }

    // console.log(formData);
    
  }

  return (
    <>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6 bg-white shadow-lg rounded-lg my-16">
  <div className="text-center mb-16">
    <h4 className="text-gray-700 text-xl font-semibold mt-6">Log in to your account</h4>
  </div>

  <form onSubmit={submitHandler} className='flex flex-col items-center '>
    <div className="grid sm:grid-cols-2 gap-8 w-full">
      <div>
        <label className="text-gray-700 text-sm mb-2 block">Email Id</label>
        <input
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="text"
          className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="text-gray-700 text-sm mb-2 block">Password</label>
        <input
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          type="password"
          className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          placeholder="Enter password"
        />
      </div>
    </div>

    <div className="mt-12">
      <button
        type="submit"
        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-zinc-900 bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      >
        Sign up
      </button>
    </div>
  </form>
</div>

    </>
  )
}

export default Login
