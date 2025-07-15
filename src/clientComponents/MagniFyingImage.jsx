import React from 'react'
import ReactImageMagnify from 'react-image-magnify'

const MagniFyingImage = ({ image }) => {
  return (
    <div className="mgi_perimeter">
      <div className="mgi_image xl:w-[414.31px] w-[380px] h-[380px] xl:h-[414.31px]">
        <ReactImageMagnify
          smallImage={{
            alt: "Product",
            isFluidWidth: true,
            src: `${image}`,
            // sizes: "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
          }}
          largeImage={{
            // alt: "",
            // src: `${image}`,
            // width: 1200,
            // height: 1800,
          }}
          isHintEnabled={false}
        />
      </div>
    </div>
  )
}

export default MagniFyingImage