import{n as e,t}from"./modulepreload-polyfill-CH3kC-M2.js";var n,r=e((()=>{n=(e,t)=>{let r=document.querySelector(`.progress`),i=`loading...`;t===0?(e=!0,i=i.slice(0,1),setTimeout(()=>n(e,t+1),100)):t===i.length?(e=!1,i=i.slice(0,i.length),setTimeout(()=>n(e,t-1),100)):(i=i.slice(0,t),t=e?t+1:t-1,setTimeout(()=>n(e,t),100)),r.textContent=i}}));async function i(){let e={identifier:`tester`,password:`Testing123...`};return await fetch(d+f,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)}).then(e=>e.json()).then(e=>e.jwt)}async function a(){return p||=await i(),p}async function o(e,t){let n=d+e,r=await a();try{let e=await fetch(n,{method:`POST`,headers:{Authorization:`Bearer ${r}`,"Content-Type":`application/json`},body:JSON.stringify({data:t})});if(!e.ok)throw Error(`HTTP Error: `+e.status);return await e.json()}catch(e){console.error(e)}}async function s(e,t){let n=d+e,r=await a();try{let e=await fetch(n,{method:`PUT`,headers:{Authorization:`Bearer ${r}`,"Content-Type":`application/json`},body:JSON.stringify({data:t})});if(!e.ok)throw Error(`HTTP Error: `+e.status);return await e.json()}catch(e){console.error(e)}}async function c(e,t){let n=d+e,r=await a();try{let e=await fetch(n,{method:`POST`,headers:{Authorization:`Bearer ${r}`},body:t});if(!e.ok)throw Error(`HTTP Error: `+e.status);return e.json()}catch(e){console.error(e)}}async function l(e){let t=d+e,n=await a();try{fetch(t,{method:`DELETE`,headers:{Authorization:`Bearer ${n}`}})}catch(e){console.error(e.message)}}async function u(e){try{let t=await fetch(`${d+e}?populate=image`);if(!t.ok)throw Error(`HTTP error: `+t.status);let n=await t.json();return n=n.data.map(e=>({...e,img:e.image&&e.image[0].url,imgId:e.image&&e.image[0].id,imgName:e.image&&e.image[0].name})),n}catch(t){if(t.name===`TypeError`){setTimeout(()=>{u(e)},2e3);return}else console.error(t)}}var d,f,p,m=e((()=>{d=`https://special-dream-2d5e7f6b1a.strapiapp.com`,f=`/api/auth/local`,p=null})),h,g=e((()=>{m(),b(),h=class e{constructor(e={img:``,imgId:``,imgDocId:``,name:``,documentId:``,description:``}){this.data=e;let t=document.querySelector(`form`),n=document.createElement(`form`);n.innerHTML=`
    <div class="cardTitles">
      <div class="name">
        <input type="text" name="name" id="" value="${e.name}" placeholder="product name*" required />
        <span class="instruction"></span>
      </div>
      <div class="label">
        <input type="text" name="corner" id="" value="${e.corner||``}" placeholder="product label" />
      </div>
      <div>
        <input type="text" name="description" id="" value="${e.description}" placeholder="write concise description*" required />
        <span class="instruction"></span>
      </div>
      <div class="imageInput">
        <img class="resetImage" width="32" src="./avatar.png" />
        <p class="imageInfo">${e.img||`select an image`}</p>
        <label for="filePicker" class="upload">
          <img width="20" src="./avatar.png" />
          upload
        </label>
        <input class="filePicker" type="file" name="image" id="filePicker" accept="image/*" alt="" />
        
        <p class="uploadedImage" style="background-image: url('${e.img}'); background-size: cover;"></p>
      </div>
      <textarea class="specification" name="specification" id="" value="${e.specification||``}" placeholder="enter specifications" rows="8" cols="40" ></textarea>
      <div class="button">
        <button class="reset" type="reset">clear edit</button>
        <button class="submit" type="submit">add product</button>
      </div>
    </div>
    `,t.replaceWith(n),this.el=n,this.setEventHandlers()}setEventHandlers(){let t=e=>{let t=e.currentTarget.files[0],n=URL.createObjectURL(t),r=new Image;r.src=n,r.onload=()=>{let e=document.createElement(`p`);document.querySelector(`.uploadedImage`).replaceWith(e),e.outerHTML=`<p class="uploadedImage" style="background-image: url('${n}'); background-size: cover;"></p>`;let r=document.querySelector(`.imageInfo`);r.textContent=t.name,t.lastModifiedDate}},n=document.querySelector(`.filePicker`);n.removeEventListener(`change`,t),n.addEventListener(`change`,t);let r=document.querySelector(`form button[type='reset']`),i=()=>{new e};r.removeEventListener(`click`,i),r.addEventListener(`click`,i);let a=this.el,d=async e=>{e.preventDefault(),e.stopPropagation();let t=this.data,n=e.currentTarget,r=new FormData(n),a=Object.fromEntries(r.entries()),d=document.querySelector(`.imageInfo`).textContent,f;if(d.startsWith(`http`)){let e=await(await fetch(d)).blob();f=new File([e],t.imgName)}else f=a.image;delete a.image;{let e=t.documentId,n;n=e?await s(`/api/products/${e}`,a):await o(`/api/products`,a);let r=new FormData;r.append(`files`,f),r.append(`ref`,`api::product.product`),r.append(`refId`,n.data.id),r.append(`field`,`image`);let d=t.imgId;d&&await l(`/api/upload/files/${d}`),await c(`/api/upload`,r)&&(i(),new y(await u(`/api/products`)))}};a.removeEventListener(`submit`,d),a.addEventListener(`submit`,d)}}})),_,v=e((()=>{g(),m(),_=class{el;cardInfo;constructor(e){this.cardInfo=e;let t=document.createElement(`div`),n=crypto.randomUUID(),r=new Image;r.classList.add(`img`),r.src=e.img,r.style.animation=`none`,r.style.backgroundSize=`cover`,r.onload=()=>{document.getElementById(n).replaceWith(r)},t.innerHTML=`
      ${e.corner?`<p class="corner"><span>${e.corner}</span></p>`:``}
      <img class="img" id="${n}" />
      <h3 class="productName">${e.name}</h3>
      <p class="productDesc">${e.description}</p>
      <button class="productAction" type="button">delete</button>
    `,t.classList.add(`card`),t.dataset.cardInfo=JSON.stringify(e),t.addEventListener(`click`,this.projectSelf),t.lastElementChild.addEventListener(`click`,this.deleteProduct),this.el=t}projectSelf(e){let t=e.currentTarget.dataset.cardInfo;t=JSON.parse(t),new h(t)}async deleteProduct(e){e.stopPropagation();let t=e.currentTarget.parentElement,n=JSON.parse(t.dataset.cardInfo),r=n.imgId;r&&await l(`/api/upload/files/${r}`),await l(`/api/products/${n.documentId}`)}}})),y,b=e((()=>{v(),y=class{lists=[];constructor(e){this.cardsInfo=e,e.map(e=>{this.lists.push(new _(e))}),this.#e()}#e(){let e=document.querySelector(`.main`);e.innerHTML=``,this.lists.map(t=>{e.appendChild(t.el)})}}}));t((async()=>{b(),g(),m(),r(),new h,n(!0,0),new y(await u(`/api/products`))}))();