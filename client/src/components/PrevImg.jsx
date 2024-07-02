import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function PrevImg({ image }) {
  return (
    <div className="">
      <div className="max-w-lg mx-auto mt-10">
        <div className="bg-white rounded-xl border-2 border-gray-400 p-6" style={{height: '450px'}}>
          {image ? <div>
            <img src={image} alt='old_img' className='storage-prop' />
          </div> :
          <div className='alter-prop'>
              <CameraAltIcon className='text-2xl' />
              <p className='text-lg'>No Image Uploaded</p>
          </div>}
        </div>
      </div>
    </div>
  )
}
