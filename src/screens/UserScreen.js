import { useEffect, useState} from 'react'
// import UserContext from '../UserContext'
// import { useEffect, useState } from 'react'
const UserScreen = () => {
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    const token = localStorage.getItem('token')
    console.log(token)

    useEffect(() =>{
        fetch(`https://evening-forest-87496.herokuapp.com/user/details`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
            console.log(user)
        })
    },[])

    useEffect(() => {
        fetch(`https://evening-forest-87496.herokuapp.com/order/user-orders`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data)
            console.log(data)
        })
    },[])
// console.log(orders[0].products)
  return (
    <div>
      <h3>Hi, {user.username}</h3>
      <h2>Your orders:</h2>

    </div>
  )
}

export default UserScreen
