import { useEffect, useState } from "react"
import axios from "axios"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
       
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/api/user/infor', {
                        headers: { Authorization: token }
                    })
                    //console.log('res', res)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                } catch (error) {
                    alert("User Api "+error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])
  return (
    {isLogged, isAdmin, setIsLogged, setIsAdmin}
  )
}

export default UserAPI