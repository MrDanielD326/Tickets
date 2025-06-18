import React, { useRef, useState, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage }) => {
    const [previewUrl, setPreviewUrl] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!image) return setPreviewUrl(null)
        const preview = URL.createObjectURL(image)
        setPreviewUrl(preview)
        return () => URL.revokeObjectURL(preview)
    }, [image])

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        file && setImage(file)
    };

    return (
        <div className='flex justify-center mb-6'>
            <input
                className='hidden'
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
            />
            <div className='relative w-20 h-20'>
                {previewUrl ? (
                    <>
                        <img className='w-full h-full rounded-full object-cover border-1 border-black' src={previewUrl} alt='Profile pic' />
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                            onClick={() => setImage(null)}
                        >
                            <LuTrash />
                        </button>
                    </>
                ) : (
                    <>
                        <div
                            className='w-full h-full flex items-center justify-center bg-blue-100/50 rounded-full cursor-pointer'
                            onClick={() => inputRef.current?.click()}
                        >
                            <LuUser className='text-4xl text-primary' />
                        </div>
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                            onClick={() => inputRef.current?.click()}
                        >
                            <LuUpload />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfilePhotoSelector
