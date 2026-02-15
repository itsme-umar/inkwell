import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, PostForm } from "../components"
import appwriteService from '../appwrite/config'

function EditPost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                setPost(post)
            })
        } else {
            navigate('/inkwell/')
        }
    }, [slug, navigate])
    return post ? (
        <div className=" py-8">
            <Container>
                <PostForm post = {post} />
            </Container>
        </div>
    ) : null

}

export default EditPost
