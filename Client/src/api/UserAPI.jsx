import { useEffect, useState } from "react"
import axios from "axios"

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        //const firstLogin = localStorage.getItem('firstLogin')
        if(token) {
            // setIsLogged(true)
            // const admin = localStorage.getItem('isAdmin')
            // setIsAdmin(admin)
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })
                    console.log('res', res)
                } catch (error) {
                    alert(error.response.data.msg)
                }
                // const res = await axios.get('/user/infor', {
                //     headers: { Authorization: token }
                // })
                // setIsLogged(true)
                // setIsAdmin(res.data.isAdmin)
            }
            getUser()
        }
    }, [token])
  return (
    {isLogged: [isLogged, setIsLogged], isAdmin: [isAdmin, setIsAdmin]}
  )
}

export default UserAPI