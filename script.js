const app = document.getElementById("root");
const ul = document.createElement("ul");

ul.classList = "list";

app.innerHTML = "";
app.appendChild(ul);

const products = [];

const fetchProductList = async () => {
  try {
    // const response = await fetch("https://fakestoreapi.com/products");
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products.push(...data.products);
    console.log(products);
    displayProduct();
  } catch (error) {
    console.log("Error", error);
  }
};

const deleteProduct = (id) => {
  console.log("delete clicked", id);
  const updateProduct = products.filter((product) => id !== product.id);

  products.length = 0;
  products.push(...updateProduct);
  displayProduct();
  console.log("updateProduct", updateProduct);
};

const editProducdt = (id) => {
  const product = products.find((product) => product.id === id);
  if (!product) return;

  console.log(product);

  const form = createElement("form", "editForm");
  const titleInput = createElement("input");
  titleInput.value = product.title;

  const descriptionInput = createElement("textarea");
  descriptionInput.value = product.description;

  const saveBtn = createElement("button");
  saveBtn.textContent = "Save";

  form.onSubmit = (e) => {
    e.preventDefault();
    saveProduct(id, titleInput.value, descriptionInput.value);
  };

  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(saveBtn);

  const li = document.querySelector(`li[key="${id}"]`);
  li.innerHTML = "";
  li.appendChild(form);
};

const saveProduct = (id, newTitle, newDescription) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index].title = newTitle;
    products[index].description = newDescription;

    console.log("Product update", products[index]);
    displayProduct();
  }
};

const createElement = (tag, className, textContent = "", attribute = {}) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  for (const [key, value] of Object.entries(attribute)) {
    element.setAttribute(key, value);
  }

  return element;
};

const displayProduct = () => {
  ul.innerHTML = "";

  products.forEach((product) => {
    const li = createElement("li", "list-item");
    li.setAttribute("key", product.id);

    const h1 = createElement("h1", "", product.title);
    const img = createElement("img", "product-image", "", {
      src: product.images,
      alt: product.title,
    });

    const p = createElement("p", "", product.description);

    const price = createElement("span", "", `Price: ${product.price}`);
    const category = createElement("span", "", `Category: ${product.category}`);
    const footerDiv = createElement("div", "card-product-footer");
    const footerBottom = createElement("div", "footer-bottom");
    const deleteBtn = createElement("button", "delete-btn", "Delete");
    const editBtn = createElement("button", "editBtn", "Edit");

    deleteBtn.addEventListener("click", () => deleteProduct(product.id));
    editBtn.addEventListener("click", () => editProducdt(product.id));

    footerDiv.append(price, category);
    footerBottom.append(deleteBtn, editBtn);
    li.append(h1, img, p, footerDiv, footerBottom);
    ul.appendChild(li);
  });
};

fetchProductList();
