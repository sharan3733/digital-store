import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Heading from "@/components/Heading";


export default function NewProduct() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [product, setProduct] = useState(null)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [free, setFree] = useState(false)

    const loading = status === 'loading'

    if (loading) {
        return null
    }
    if (!session) {
        router.push('/')
        return
    }

    return (
        <div>
            <Heading />

            <h1 className="flex justify-center mt-20 text-xl">Add a new product</h1>
            <div className="flex justify-center">
                <form
                    className="mt-10"
                    onSubmit={async (e) => {
                        e.preventDefault()

                        const body = new FormData()
                        body.append('image', image)
                        body.append('product', product)
                        body.append('title', title)
                        body.append('free', free)
                        body.append('price', price)
                        body.append('description', description)

                        await fetch('/api/new', {
                            body,
                            method: 'POST',
                        })
                        router.push(`/dashboard`)
                    }}>
                    <div className="flex-1 mb-5">
                        <div className="flex-1 mb-2">Product title (required)</div>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-1 mb-4 text-black border"
                            required
                        />


                        <div className="relative flex items-start mt-2 mb-3">
                            <div className="flex items-center h-5">
                                <input
                                    type='checkbox'
                                    checked={free}
                                    onChange={(e) => setFree(!free)}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label>Check if the product is free</label>
                            </div>
                        </div>
                        {!free && (
                            <>
                                <div className="flex-1 mb-2">Product price in $ (required)</div>
                                <input
                                    pattern='^\d*(\.\d{0,2})?$'
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="p-1 text-black border"
                                />
                            </>
                        )}
                        <div className="flex-1 mb-2">Description</div>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-1 text-black border"
                        />
                    </div>
                    <div className="text-sm">
                        <label className="relative block my-3 font-medium cursor-pointer">
                            <p className="">Product image{image && '✅'}</p> (800 * 450 suggested)
                            <input
                                type='file'
                                accept='image/*'
                                className="hidden"
                                onChange={(event) => {
                                    if (event.target.files && event.target.files[0]) {
                                        if (event.target.files[0].size > 3072000) {
                                            alert('Maximum size allowed is 3MB')
                                            return false
                                        }
                                        setImage(event.target.files[0])
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <div className="text-sm">
                        <label className="relative block my-3 font-medium cursor-pointer">
                            <p className="">Product {product && '✅'}</p> (required)
                            <input
                                type='file'
                                className="hidden"
                                onChange={(event) => {
                                    if (event.target.files && event.target.files[0]) {
                                        if (event.target.files[0].size > 20480000) {
                                            alert('Maximum size allowed is 20MB')
                                            return false
                                        }
                                        setProduct(event.target.files[0])
                                    }
                                }}
                            />
                        </label>
                    </div>
                    <button
                        disabled={title && product && (free || price) ? false : true}
                        className={`border px-8 py-2 mt-10 font-bold ${title && (free || price)
                                ? ''
                                : 'cursor-not-allowed text-gray-800 border-gray-800'
                            }`}>
                        Create product
                    </button>
                </form>
            </div>
        </div>
    )

}