import ImageIcon from '@mui/icons-material/Image';

export default function NewImg({image}) {
  return (
    <div>
      <div className="max-w-lg mx-auto mt-10">
        <div className="bg-white rounded-xl border-2 border-gray-400 p-6" style={{height: '450px'}}>
        {image ? <div>
            <img src={image} alt='old_img' className='storage-prop' />
          </div> :
          <div className='alter-prop'>
              <ImageIcon className='text-2xl' />
              <p className='text-lg'>Restored Image will be shown here</p>
          </div>
        }
        </div>
      </div>
    </div>
  )
}
