import  React, { createContext, useState } from "react";

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])

    const getAllCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }
    const addCategory = (category) => {
        return fetch("http://localhost:8000/categories",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(category)
        })
        .then(getAllCategories)
    }
    const deleteCategory = (categoryId) => {
        return fetch(`http://localhost:8000/categories/${categoryId}`,{
            method: "DELETE"
        })
        .then(getAllCategories)
    }
    const updateCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}`,{
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(category)
        })
        .then(getAllCategories)
    }
    return (
    <CategoryContext.Provider value={{getAllCategories, categories, addCategory, deleteCategory, updateCategory}}>
        {props.children}
    </CategoryContext.Provider>
    )
}

