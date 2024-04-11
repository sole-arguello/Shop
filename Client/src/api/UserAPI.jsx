import { useEffect, useState } from "react"
import axios from "axios"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
       
        if(token) {
            console.log('token user api', token)
            const getUser = async () => {
                try {
                    const res = await axios.get('/api/user/infor', {
                        headers: { Authorization: token }
                    })
                    console.log('res', res)
                    setIsLogged(true)
                    console.log('RES', res.data.user.role)
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false)//cambia la vista del front
                    
                } catch (error) {
                    console.log('error user api', error)
                    alert("User Api " +error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])
  return (
    {isLogged, setIsLogged, isAdmin, setIsAdmin}
  )
}

export default UserAPI