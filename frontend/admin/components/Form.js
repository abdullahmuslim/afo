import { deleteItem, postData, putData, putImage } from "../fetchData.js";

class Form {
  constructor(
    data = {
      img: "",
      imgId: "",
      name: "",
      documentId: "",
      description: "",
    }
  ) {
    const form = document.querySelector("form");
    form.dataset.documentId = data.documentId || "";
    form.dataset.imgId = data.imgId || "";

    form.innerHTML = `
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
    this.el = form;

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
    filePicker.addEventListener("change", pickFile);

    // clear button handler
    const clear = document.querySelector("form button[type='reset']");
    const clearForm = () => {
      const form = new Form();
    }
    clear.addEventListener("click", clearForm);

    // submit button handler
    const form = this.el;

    const verify = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      // verified input values
      const verified = true;
      
      // extract data
      const form = event.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries())

      const url = document.querySelector(".imageInfo").textContent;
      let image;
      if (url.startsWith("http")) {
        const response = await fetch(url);
        const result = await response.blob();
        console.log(result);
        image = new File([result], 'randomlygenerated.jpg');
      } else {
        image = data.image;
      }
      const deleted = delete data.image;

      if (verified) {
        //determine to update or upload entries
        const id = form.dataset.documentId;
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
        const imgId = form.dataset.imgId;
        // delete old image
        if (imgId) deleteItem(`/api/upload?=${imgId}`);

        // upload new image
        const imageUploadResponse = await putImage("/api/upload", imageData);
        if (imageUploadResponse) {
          // console.log(imageUploadResponse);
          // clearForm();
        }
      }
      // uploading data

    }
    form.addEventListener("submit", verify);
  }
}

export default Form;