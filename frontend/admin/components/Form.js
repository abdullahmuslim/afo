import { postData, putData, putImage } from "../fetchData.js";

class Form {
  constructor(
    data={
      img: "",
      name: "",
      description: "",
    }){
    const form = document.querySelector("form");
    form.dataset.documentID = data.documentId;
    form.innerHTML = `
    <div class="cardTitles">
      <input type="text" name="name" id="" value="${data.name}" placeholder="product name" required />
      <input type="text" name="description" id="" value="${data.description}" placeholder="write short and attention sparking description" required />
    </div>
    <textarea class="description" name="specification" id="" placeholder="enter full spec details here" rows="8" cols="40"></textarea>
    <fieldset>
      <button class="reset" type="reset">clear edit</button>
      <button class="submit" type="submit">add</button>
    </fieldset>
    <label class="imageInput" for="filePicker">
      <p>click <span>here</span> to add an image from your device</p>
      <input class="filePicker" type="file" name="image" id="filePicker" accept="image/*" alt="" required />
      <p class="uploadedImage" style="background-image: url('${data.img}'); background-size: cover;"></p>
    </label>
    <button class="imgButton" type="button">upload</button>
    `;
    this.el = form;
    
    this.setEventHandlers();
  }
  setEventHandlers(){
    
    // image picker handler
    const pickFile = (e) => {
      const el = e.currentTarget;
      const image = el.files[0];
      const imageURL = URL.createObjectURL(image);
      const uncompressedImg = new Image();
      uncompressedImg.src = imageURL;
      
      uncompressedImg.onload = () => {
        const newUploadedImage = document.createElement("p");
        const uploadedImage = document.querySelector(".uploadedImage");
        uploadedImage.replaceWith(newUploadedImage);
        newUploadedImage.outerHTML = `<p class="uploadedImage" style="background-image: url('${imageURL}'); background-size: cover;"></p>`;
        
      }
    }
    const filePicker = document.querySelector(".filePicker");
    filePicker.addEventListener("change", pickFile);
    
    // clear button handler
    const clear = document.querySelector("form button[type='reset']");
    const clearForm = () => {
      new Form();
    }
    clear.addEventListener("click", clearForm);
    
    // submit button handler
    const form = this.el;
    const verify = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries())

      const image = data.image;
      delete data.image;

      if (image){
        //determine to update or upload
        let uploadResponse;
        const id = form.dataset.documentID;
        if (form.dataset.documentID) {
          uploadResponse = await putData(`/api/products/${id}`, data);
        } else {
          uploadResponse = await postData("/api/products", data);
        }
        console.log(uploadResponse);
        const imageData = new FormData();
        imageData.append("files", image);
        imageData.append('ref', 'api::product.product'); // Collection UID
        imageData.append('refId', uploadResponse.data.id);                  // Entry ID
        imageData.append('field', 'image');
        const imageUploadResponse = await putImage("/api/upload", imageData);
        if (imageUploadResponse) {
          // clearForm();
        }
      }
      // uploading data
      
    }
    form.addEventListener("submit", verify);
  }
}

export default Form;