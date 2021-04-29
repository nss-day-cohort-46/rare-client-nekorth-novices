import React from "react"
import { Route } from "react-router-dom"
import { CommentProvider } from "./comment/CommentProvider"
import { PostDetail } from "./post/PostDetail"
import { PostForm } from "./post/PostForm"
import { PostList } from "./post/PostList"
import { PostProvider } from "./post/PostProvider"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/posts">
                <PostList />
            </Route>
            <Route exact path="/posts/create">
                <PostProvider>
                    <PostForm />
                </PostProvider>
            </Route>
            <Route exact path="/posts/detail/:postId(\d+)">
                <PostProvider>
                    <CommentProvider>
                        <PostDetail />
                    </CommentProvider>
                </PostProvider>
            </Route>
        </main>
    </>
}
