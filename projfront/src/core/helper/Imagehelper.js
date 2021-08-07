import { Api } from "../../backend";


const ImageHelper =(props)=>{
  console.log(props.prod+"mkm")
            const image = props.prod?`${Api}product/photo/${props.prod}`:"https://wi.wallpapertip.com/wsimgs/94-940805_beautiful-wallpapers-with-quotes-of-life.jpg"

        return(

            <img
            src={image}
            alt="photo"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="mb-3 rounded"
          />
        )

}
export default ImageHelper;