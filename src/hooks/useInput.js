import React, { useState } from "react"

/* const useInput = () => {
  const [value, setValue] = useState("")
  const handler = (e) => {
    setValue(e.target.value)
  }
  return [value, handler]
} */

const useInput = (e) => {
  const [content, setContent] = useState("")
  const { name, value } = e.target
  const handler = (e) => {
    setContent({ ...content, [name]: value })
  }
  return [value, handler]
}

export default useInput
