import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Upload image function with basic error handling
  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      alert("Please upload an image first!");
      return;
    }

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      } else {
        alert("Failed to upload the image, please try again.");
      }
    });
  }

  // Fetch feature images on component mount
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      {/* Image upload component */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      
      {/* Upload button */}
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Render the list of feature images */}
      {featureImageList && featureImageList.length > 0 ? (
        <div className="flex flex-col gap-4 mt-5">
          {featureImageList.map((featureImgItem, index) => (
            <div key={index} className="relative">
              <img
                src={featureImgItem.image}
                alt={`Feature Image ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-center">No feature images available.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
