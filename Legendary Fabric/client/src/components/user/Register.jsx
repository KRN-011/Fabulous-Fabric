import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { registerUser } = useContext(AppContext)

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value });
  }

  const { name, email, password } = formData

  const submitHandler = async (e) => {
    e.preventDefault()

    const result = await registerUser(name, email, password);

    if (result.success) {
      navigate('/login')
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6 bg-white shadow-lg rounded-lg mt-16">
  <div className="text-center mb-16">
    <h4 className="text-gray-700 text-xl font-semibold mt-6">Sign up for your account</h4>
  </div>

  <form onSubmit={submitHandler} className='flex flex-col items-center '>
    <div className="grid sm:grid-cols-2 gap-8 w-full">
      <div>
        <label className="text-gray-700 text-sm mb-2 block">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
          type="text"
          className="bg-gray-100 w-full text-gray-700 text-sm px-4 py-3.5 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          placeholder="Enter name"
        />
      </div>
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
        className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-zinc-900 bg-yellow-400 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all"
      >
        Sign up
      </button>
    </div>
  </form>
</div>

    </>
  )
}

export default Register
