import fetchData, { deleteItem, getImage, postData, putData, putImage } from "../fetchData.js";
import Cards from "./Cards.js";

class Form {
  constructor(
    data = {
      img: "",
      imgId: "",
      imgDocId: "",
      name: "",
      documentId: "",
      description: "",
    }
  ) {
    this.data = data;
    const oldForm = document.querySelector("form");
    const newForm = document.createElement("form");
    
    // newForm.dataset.documentId = data.documentId || "";
    // newForm.dataset.imgId = data.imgId || "";
    // newForm.dataset.imgDocId = data.imgDocId || "";

    newForm.innerHTML = `
    <div class="cardTitles">
      <div class="name">
        <input type="text" name="name" id="" value="${data.name}" placeholder="product name*" required />
        <span class="instruction"></span>
      </div>
      <div class="label">
        <input type="text" name="corner" id="" value="${data.corner || ''}" placeholder="product label" />
      </div>
      <div>
        <input type="text" name="description" id="" value="${data.description}" placeholder="write short and attention sparking description*" required />
        <span class="instruction"></span>
      </div>
      <div class="imageInput">
        <img class="resetImage" width="32" src="./avatar.png" />
        <p class="imageInfo">${data.img || "select an image"}</p>
        <label for="filePicker" class="upload">
          <img width="20" src="./avatar.png" />
          upload
        </label>
        <input class="filePicker" type="file" name="image" id="filePicker" accept="image/*" alt="" />
        
        <p class="uploadedImage" style="background-image: url('${data.img}'); background-size: cover;"></p>
      </div>
      <textarea class="specification" name="specification" id="" placeholder="enter full spec details here" rows="8" cols="40"></textarea>
      <div class="button">
        <button class="reset" type="reset">clear edit</button>
        <button class="submit" type="submit">add product</button>
      </div>
    </div>
    `;
    oldForm.replaceWith(newForm);
    this.el = newForm;

    this.setEventHandlers();
  }
  setEventHandlers() {

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
        const imageInfo = document.querySelector(".imageInfo");
        imageInfo.textContent = image.name;
        const date = image.lastModifiedDate;
      }
    }
    const filePicker = document.querySelector(".filePicker");
    filePicker.removeEventListener("change", pickFile);
    filePicker.addEventListener("change", pickFile);

    // clear button handler
    const clear = document.querySelector("form button[type='reset']");
    const clearForm = () => {
      const form = new Form();
    }
    clear.removeEventListener("click", clearForm);
    clear.addEventListener("click", clearForm);

    // submit button handler
    const form = this.el;

    const verify = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const cardInfo = this.data;
      
      // verified input values
      const verified = true;
      
      // extract data
      const form = event.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries())

      const placeholder = document.querySelector(".imageInfo").textContent;
      let image;
      
      // get image data
      if (placeholder.startsWith("http")) {
        const response = await fetch(placeholder);
        const result = await response.blob();
        image = new File([result], cardInfo.imgName);
      } else {
        image = data.image;
      }
      const deleted = delete data.image;

      if (verified) {
        //determine to update or upload entries
        const id = cardInfo.documentId;
        let uploadResponse;
        if (id) {
          uploadResponse = await putData(`/api/products/${id}`, data);
        } else {
          uploadResponse = await postData("/api/products", data);
        }
        const imageData = new FormData();
        imageData.append("files", image);
        imageData.append('ref', 'api::product.product'); // Collection UID
        imageData.append('refId', uploadResponse.data.id); // Entry ID
        imageData.append('field', 'image');
        const imgId = cardInfo.imgId;

        
        // delete old image
        if (imgId) { 
          await deleteItem(`/api/upload/files/${imgId}`);
        }
        // upload new image
        const imageUploadResponse = await putImage("/api/upload", imageData);
        if (imageUploadResponse) {
          clearForm();
          const data = await fetchData("/api/products");
          const cards = new Cards(data);
        }
      }

    }
    form.removeEventListener("submit", verify);
    form.addEventListener("submit", verify);
  }
}

export default Form;