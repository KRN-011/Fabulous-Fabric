import React from 'react'

const Button = ({ text }) => {
  return (
    <>
    <div>
  <button className="bg-yellow-400 px-6 py-2 md:px-6 md:py-3 rounded-lg text-zinc-900 text-sm md:text-base font-medium hover:bg-yellow-500 transition-all duration-200">
    {text}
  </button>
</div>

    </>
  )
}

export default Button
