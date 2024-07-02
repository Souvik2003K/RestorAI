import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PrevImg from './PrevImg';
import NewImg from "./NewImg";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Hourglass } from 'react-loader-spinner';
import CloseIcon from '@mui/icons-material/Close';

export default function Home() {

    const [fileName, setFileName] = useState('No file chosen...');

    const userSession = localStorage.getItem('user');
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [viewImage, setViewImage] = useState(null);
    const [restored, setRestored] = useState(null);
    const imageInputRef = useRef(null);

    const [loader, setLoader] = useState(false);

    const handleImageChange = (e) => {
        const fileInput = e.target;
        const filePath = fileInput.value;
        const fileName = filePath.split('\\').pop();
        setFileName(fileName.slice(0, 15));
        setImage(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setViewImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setFileName('No file chosen...');
        setImage(null);
        setViewImage(null);
        if(loader){
            setLoader(false);
        }
    }

    const generate = async (e) => {
        e.preventDefault();
        try {
            if(userSession){
                setLoader(true);
                const form = new FormData();
                console.log("image before sending to backend", image)
                form.append('file', image);
                await axios.post('http://localhost:8000/user/generate', form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then((res) => {
                    setRestored(res.data.output);
                    setLoader(false);
                }).catch((err) => {
                    console.log(err);
                    setLoader(false);
                });
            }
            else{
                setLoader(false);
                navigate('/login');
            }
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }


    return (
        <div>
            <section className='w-full flex-center flex-col' style={{marginTop: '40px'}}>
                <h1 className='head_text text-center'>
                    Memories into HD
                    <br className='max-md:hidden' />
                    <span className='orange_gradient text-center'> AI-based Image Restoration</span>
                </h1>
                <p className='mt-5 text-lg text-gray-600 w-xl text-center font-semibold'>
                    RestorAI is an open-source AI image restoration tool for enhancing all your low-quality images.
                </p>
            </section>
            <div className="file-upload text-center font-sans text-sm w-2/5 mx-auto my-5">
                <div className='grid grid-cols-[4fr_1fr]'>
                    <div className={`file-select border-2 ${fileName === 'No file chosen...' ? 'border-gray-300' : 'border-orange-400'} cursor-pointer h-10 leading-10 text-left bg-white overflow-hidden relative`}>
                        <div className={`file-select-button ${fileName === 'No file chosen...' ? 'bg-gray-300 text-gray-700' : 'bg-orange-400 text-white'} inline-block h-10 leading-10 px-2`}>
                            Choose File
                        </div>
                        <div className="file-select-name inline-block h-10 leading-10 px-2">{fileName}...</div>
                        <input
                            type="file"
                            name="chooseFile"
                            accept='image/*'
                            id="chooseFile"
                            ref={imageInputRef}
                            onChange={handleImageChange}
                            className="z-10 cursor-pointer absolute h-full w-full top-0 left-0 opacity-0"
                        />
                    </div>
                    {image && <div className='border border-orange-700 h-10 w-10 flex justify-center items-center'><CloseIcon className='text-orange-600' onClick={removeFile} /></div>}
                </div>
                </div>
        <section className="grid grid-cols-[4fr_0.5fr_4fr] mt-5 items-center">
            <PrevImg image={viewImage} />
            <ArrowRightAltIcon className="mx-auto" style={{fontSize: '60px'}} />
            <NewImg image={restored} />
        </section>
        <div className='flex justify-center my-5'>
            <button className='bg-orange-400 px-5 py-3 text-white rounded-xl font-bold' onClick={generate}>{loader ? <Hourglass visible={true} height="20" width="80" ariaLabel="hourglass-loading" wrapperStyle={{}} wrapperClass="" colors={['#fff', '#fff']} /> : 'Generate'}</button>
        </div>
        </div>
    )
}

