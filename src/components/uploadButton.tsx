'use client'
import {UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from 'react'

const UploadButton = () => {
    const [imageUrl,setImageUrl]=useState<string>('');
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadDropzone
            appearance={{
                container:{
                    border:'1px solid blue'
                },
                uploadIcon:{
                    color:'blue'
                }
            }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setImageUrl(res[0].url);
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {imageUrl.length ?(<div>
                <Image src={imageUrl} alt='mi image' width={500} height={300}/>
            </div>):null}
        </main>)
}

export default UploadButton
