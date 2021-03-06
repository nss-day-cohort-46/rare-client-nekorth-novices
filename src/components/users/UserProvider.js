import React, { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [rareUsers, setUsers] = useState([])
    const [loggedInUserId, setLoggedInUserId] = useState([])
    const getAllUsers = () => {
        return fetch("http://localhost:8000/users",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }
    const getInactiveUsers = () => {
        return fetch("http://localhost:8000/users/inactive",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setUsers)
    }
    const getUserById = (userId) =>{
        return fetch(`http://localhost:8000/users/${userId}`,{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }
    const updateUser = (updatedUser) => {
        return fetch(`http://localhost:8000/users/${updatedUser.id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(updatedUser)
        })
    }
    // const getSubcriptions = (userId) => {
    //     return fetch(`http://localhost:8000/subscriptions/${userId}`)
    //     .then(res => res.json())
    //     .then(res => console.log("subcriptions: ",res))
    // }
    const checkSubscribed = (authorId) => {
        return fetch("http://localhost:8000/users/subscription_status", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "author_id": authorId
            })
        })
            .then(res => res.json())
    }
    const changeSubscribed = (subscribing, subscription) => {
        return fetch("http://localhost:8000/users/subscription",{
            method: subscribing ? "POST" : "DELETE",
            // method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(subscription)
        })
    }
    const checkAuthenticated = () => {
        return fetch(`http://localhost:8000/check-active`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                return res
            })
    }
    const changeAuthorStatus = (userId, action) => {
        return fetch(`http://localhost:8000/change-active`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify({
                "action": action,
                "user_id": userId,
            })
        })
    }

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/user_profile",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const subscriberCount = () => {
        return fetch("http://localhost:8000/users/subscriber_count",{
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
    }

    const changeRank = (updatedUser) => {
        return fetch(`http://localhost:8000/change-rank`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(updatedUser)
        })
    }
    return (
        <UserContext.Provider value={{ getAllUsers, rareUsers, getUserById, changeSubscribed, checkSubscribed, changeAuthorStatus, checkAuthenticated, getInactiveUsers, getCurrentUser, updateUser, changeRank, loggedInUserId, setLoggedInUserId, subscriberCount }}>
            {props.children}
        </UserContext.Provider>
    )
}